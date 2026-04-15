import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { QRCodeSVG } from 'qrcode.react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter,
} from '@/components/ui/dialog';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import { Plus, QrCode, Copy, Check, Trash2, Hotel, UtensilsCrossed } from 'lucide-react';
import { cn } from '@/lib/utils';

const BASE_URL = window.location.origin;

function generateToken() {
  return Math.random().toString(36).substring(2, 10) + Date.now().toString(36);
}

const initialCodes = [
  { id: 'qr_1', type: 'room', number: '204', token: 'r204x8k2mf', createdAt: '2026-04-15' },
  { id: 'qr_2', type: 'room', number: '118', token: 'r118p3q9wb', createdAt: '2026-04-15' },
  { id: 'qr_3', type: 'table', number: 'T12', token: 'tbl12y7n4c', createdAt: '2026-04-14' },
  { id: 'qr_4', type: 'room', number: '302', token: 'r302j5m1ga', createdAt: '2026-04-14' },
  { id: 'qr_5', type: 'table', number: 'T5', token: 'tbl5v2h8xe', createdAt: '2026-04-13' },
];

export default function QRCodesPage() {
  const { t } = useTranslation();
  const [codes, setCodes] = useState(initialCodes);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [previewCode, setPreviewCode] = useState(null);
  const [copiedId, setCopiedId] = useState(null);
  const [form, setForm] = useState({ type: 'room', number: '' });

  const handleCreate = () => {
    if (!form.number.trim()) return;
    const token = generateToken();
    const newCode = {
      id: `qr_${Date.now()}`,
      type: form.type,
      number: form.type === 'table' && !form.number.startsWith('T') ? `T${form.number.trim()}` : form.number.trim(),
      token,
      createdAt: new Date().toISOString().split('T')[0],
    };
    setCodes((prev) => [newCode, ...prev]);
    setForm({ type: 'room', number: '' });
    setDialogOpen(false);
    setPreviewCode(newCode);
  };

  const handleDelete = (id) => {
    setCodes((prev) => prev.filter((c) => c.id !== id));
    if (previewCode?.id === id) setPreviewCode(null);
  };

  const copyLink = (code) => {
    const url = `${BASE_URL}/guest/${code.token}`;
    navigator.clipboard.writeText(url).catch(() => {});
    setCopiedId(code.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const rooms = codes.filter((c) => c.type === 'room');
  const tables = codes.filter((c) => c.type === 'table');

  return (
    <div className="space-y-6" data-testid="qrcodes-page">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight" data-testid="qrcodes-title">{t('qrCodes.title')}</h1>
          <p className="text-sm text-muted-foreground mt-1">{t('qrCodes.subtitle')}</p>
        </div>
        <Button className="gap-2 shrink-0" onClick={() => setDialogOpen(true)} data-testid="generate-qr-button">
          <Plus className="h-4 w-4" />
          {t('qrCodes.generate')}
        </Button>
      </div>

      {/* Summary */}
      <div className="grid gap-4 grid-cols-2">
        <Card data-testid="rooms-count">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="rounded-lg bg-primary/10 p-2"><Hotel className="h-4 w-4 text-primary" /></div>
            <div>
              <p className="text-xl font-bold">{rooms.length}</p>
              <p className="text-xs text-muted-foreground">{t('qrCodes.rooms')}</p>
            </div>
          </CardContent>
        </Card>
        <Card data-testid="tables-count">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="rounded-lg bg-blue-50 p-2"><UtensilsCrossed className="h-4 w-4 text-blue-600" /></div>
            <div>
              <p className="text-xl font-bold">{tables.length}</p>
              <p className="text-xs text-muted-foreground">{t('qrCodes.tables')}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* QR Grid + Preview */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* QR List */}
        <div className="lg:col-span-2 space-y-3">
          {codes.length === 0 ? (
            <Card><CardContent className="py-12 text-center text-muted-foreground">{t('qrCodes.noCodes')}</CardContent></Card>
          ) : (
            codes.map((code) => {
              const url = `${BASE_URL}/guest/${code.token}`;
              const label = code.type === 'room' ? `${t('qrCodes.room')} ${code.number}` : `${t('qrCodes.table')} ${code.number}`;
              const isCopied = copiedId === code.id;

              return (
                <Card
                  key={code.id}
                  className={cn('cursor-pointer transition-shadow hover:shadow-md', previewCode?.id === code.id && 'ring-2 ring-primary/30')}
                  onClick={() => setPreviewCode(code)}
                  data-testid={`qr-card-${code.id}`}
                >
                  <CardContent className="p-4 flex items-center gap-4">
                    <div className="shrink-0 rounded-lg border p-1.5 bg-white">
                      <QRCodeSVG value={url} size={48} level="M" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <p className="font-semibold text-sm">{label}</p>
                        <Badge variant="outline" className={cn('text-[10px] px-1.5 py-0', code.type === 'room' ? 'text-primary border-primary/20 bg-primary/5' : 'text-blue-600 border-blue-200 bg-blue-50')}>
                          {code.type === 'room' ? t('qrCodes.room') : t('qrCodes.table')}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground truncate">/guest/{code.token}</p>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <Button
                        variant="ghost" size="icon" className="h-8 w-8"
                        onClick={(e) => { e.stopPropagation(); copyLink(code); }}
                        data-testid={`copy-${code.id}`}
                      >
                        {isCopied ? <Check className="h-3.5 w-3.5 text-primary" /> : <Copy className="h-3.5 w-3.5" />}
                      </Button>
                      <Button
                        variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive"
                        onClick={(e) => { e.stopPropagation(); handleDelete(code.id); }}
                        data-testid={`delete-${code.id}`}
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })
          )}
        </div>

        {/* Preview Panel */}
        <div className="hidden lg:block">
          {previewCode ? (
            <Card className="sticky top-20" data-testid="qr-preview">
              <CardHeader className="pb-3 text-center">
                <CardTitle className="text-base">
                  {previewCode.type === 'room' ? `${t('qrCodes.room')} ${previewCode.number}` : `${t('qrCodes.table')} ${previewCode.number}`}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center gap-4">
                <div className="rounded-xl border p-4 bg-white">
                  <QRCodeSVG value={`${BASE_URL}/guest/${previewCode.token}`} size={180} level="H" includeMargin />
                </div>
                <div className="w-full space-y-2">
                  <Label className="text-xs text-muted-foreground">{t('qrCodes.link')}</Label>
                  <div className="flex items-center gap-2">
                    <Input value={`${BASE_URL}/guest/${previewCode.token}`} readOnly className="text-xs h-8" data-testid="preview-link" />
                    <Button size="sm" variant="outline" className="shrink-0 h-8" onClick={() => copyLink(previewCode)} data-testid="preview-copy">
                      {copiedId === previewCode.id ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                    </Button>
                  </div>
                </div>
                <p className="text-[10px] text-muted-foreground">{t('qrCodes.created')} {previewCode.createdAt}</p>
              </CardContent>
            </Card>
          ) : (
            <Card data-testid="qr-preview-empty">
              <CardContent className="py-16 text-center">
                <QrCode className="h-8 w-8 mx-auto text-muted-foreground/30 mb-3" />
                <p className="text-sm text-muted-foreground">{t('qrCodes.selectPreview')}</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Generate Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-sm" data-testid="generate-dialog">
          <DialogHeader>
            <DialogTitle>{t('qrCodes.generate')}</DialogTitle>
            <DialogDescription>{t('qrCodes.generateDesc')}</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-2">
            <div className="space-y-2">
              <Label>{t('qrCodes.type')}</Label>
              <Select value={form.type} onValueChange={(v) => setForm((p) => ({ ...p, type: v }))}>
                <SelectTrigger data-testid="qr-type"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="room">{t('qrCodes.room')}</SelectItem>
                  <SelectItem value="table">{t('qrCodes.table')}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>{form.type === 'room' ? t('qrCodes.roomNumber') : t('qrCodes.tableNumber')}</Label>
              <Input
                value={form.number}
                onChange={(e) => setForm((p) => ({ ...p, number: e.target.value }))}
                placeholder={form.type === 'room' ? 'e.g. 204' : 'e.g. 12'}
                data-testid="qr-number"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)} data-testid="qr-cancel">{t('common.cancel')}</Button>
            <Button onClick={handleCreate} disabled={!form.number.trim()} data-testid="qr-create">{t('qrCodes.generate')}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
