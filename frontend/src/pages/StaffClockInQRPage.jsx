import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { QRCodeSVG } from 'qrcode.react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Logo } from '@/components/Logo';
import { Copy, Check, Download, Printer, QrCode, RefreshCw } from 'lucide-react';

const BASE_URL = window.location.origin;
const CLOCKIN_TOKEN = `clockin_${new Date().toISOString().split('T')[0].replace(/-/g, '')}`;
const CLOCKIN_URL = `${BASE_URL}/clock-in/${CLOCKIN_TOKEN}`;

export default function StaffClockInQRPage() {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);

  const copyLink = () => {
    navigator.clipboard.writeText(CLOCKIN_URL).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadQR = () => {
    const svg = document.getElementById('staff-clockin-qr');
    if (!svg) return;
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    canvas.width = 600;
    canvas.height = 600;
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.onload = () => {
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, 600, 600);
      ctx.drawImage(img, 0, 0, 600, 600);
      const a = document.createElement('a');
      a.download = 'operoo-staff-clockin-qr.png';
      a.href = canvas.toDataURL('image/png');
      a.click();
    };
    img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)));
  };

  const handlePrint = () => {
    window.print();
  };

  const today = new Date().toLocaleDateString('en', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });

  return (
    <>
      <div className="space-y-6 max-w-3xl mx-auto print:hidden" data-testid="staff-clockin-qr-page">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold tracking-tight" data-testid="staff-clockin-title">{t('staffQR.title')}</h1>
          <p className="text-sm text-muted-foreground mt-1">{t('staffQR.subtitle')}</p>
        </div>

        {/* QR Card */}
        <Card data-testid="staff-clockin-qr-card">
          <CardContent className="p-6 sm:p-8">
            <div className="grid gap-8 sm:grid-cols-2 items-center">
              {/* QR Code */}
              <div className="flex justify-center">
                <div className="rounded-2xl border-2 border-dashed border-primary/20 p-6 bg-white" data-testid="staff-qr-container">
                  <QRCodeSVG
                    id="staff-clockin-qr"
                    value={CLOCKIN_URL}
                    size={200}
                    level="H"
                    includeMargin
                  />
                </div>
              </div>

              {/* Info */}
              <div className="space-y-5">
                <div>
                  <h2 className="text-lg font-bold mb-1">{t('staffQR.label')}</h2>
                  <p className="text-sm text-muted-foreground leading-relaxed">{t('staffQR.description')}</p>
                </div>

                {/* Refresh note */}
                <div className="flex items-center gap-2 rounded-lg bg-amber-50 border border-amber-100 px-3 py-2" data-testid="refresh-note">
                  <RefreshCw className="h-3.5 w-3.5 text-amber-600 shrink-0" />
                  <p className="text-xs text-amber-700">{t('staffQR.refreshNote')}</p>
                </div>

                {/* Today */}
                <p className="text-xs text-muted-foreground" data-testid="today-date">{today}</p>

                {/* Link */}
                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground">{t('staffQR.link')}</Label>
                  <div className="flex items-center gap-2">
                    <Input value={CLOCKIN_URL} readOnly className="text-sm h-9" data-testid="clockin-link-input" />
                    <Button size="sm" variant="outline" className="shrink-0 h-9 gap-1.5" onClick={copyLink} data-testid="copy-clockin-link">
                      {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                    </Button>
                  </div>
                </div>

                {/* Actions */}
                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" className="gap-2" onClick={downloadQR} data-testid="download-clockin-qr">
                    <Download className="h-4 w-4" />
                    {t('staffQR.download')}
                  </Button>
                  <Button variant="outline" className="gap-2" onClick={handlePrint} data-testid="print-clockin-qr">
                    <Printer className="h-4 w-4" />
                    {t('staffQR.print')}
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Instructions */}
        <Card data-testid="staff-qr-instructions">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold">{t('staffQR.instructions')}</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {[t('staffQR.instruction1'), t('staffQR.instruction2'), t('staffQR.instruction3')].map((text, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                  <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                  {text}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Print Layout */}
      <div
        data-print-layout="true"
        className="hidden print:flex fixed inset-0 z-[9999] bg-white flex-col items-center justify-center p-12"
      >
        <style>{`
          @media print {
            body * { visibility: hidden !important; }
            [data-print-layout], [data-print-layout] * { visibility: visible !important; }
            [data-print-layout] { position: fixed; inset: 0; display: flex !important; }
          }
        `}</style>
        <div className="text-center max-w-md mx-auto">
          <Logo size="lg" className="mx-auto mb-10" />
          <div className="mb-8">
            <QRCodeSVG value={CLOCKIN_URL} size={280} level="H" includeMargin />
          </div>
          <h1 className="text-3xl font-bold tracking-tight mb-3">Staff Clock-in</h1>
          <p className="text-lg text-gray-500">Scan to clock in your shift</p>
        </div>
      </div>
    </>
  );
}
