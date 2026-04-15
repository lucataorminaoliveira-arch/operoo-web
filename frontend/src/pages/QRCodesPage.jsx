import { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { QRCodeSVG } from 'qrcode.react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Logo } from '@/components/Logo';
import { Copy, Check, Download, QrCode, Printer, X } from 'lucide-react';

const BASE_URL = window.location.origin;
const GUEST_URL = `${BASE_URL}/guest`;

export default function QRCodesPage() {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);
  const [showPrint, setShowPrint] = useState(false);
  const printRef = useRef(null);

  const copyLink = () => {
    navigator.clipboard.writeText(GUEST_URL).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadQR = () => {
    const svg = document.getElementById('operoo-guest-qr');
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
      a.download = 'operoo-guest-qr.png';
      a.href = canvas.toDataURL('image/png');
      a.click();
    };
    img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)));
  };

  const handlePrint = () => {
    setShowPrint(true);
    setTimeout(() => {
      window.print();
    }, 300);
  };

  return (
    <>
      <div className="space-y-6 max-w-3xl mx-auto print:hidden" data-testid="qrcodes-page">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold tracking-tight" data-testid="qrcodes-title">{t('qrCodes.title')}</h1>
          <p className="text-sm text-muted-foreground mt-1">{t('qrCodes.subtitle')}</p>
        </div>

        {/* Universal QR Card */}
        <Card data-testid="universal-qr-card">
          <CardContent className="p-6 sm:p-8">
            <div className="grid gap-8 sm:grid-cols-2 items-center">
              {/* QR Code */}
              <div className="flex justify-center">
                <div className="rounded-2xl border-2 border-dashed border-primary/20 p-6 bg-white" data-testid="qr-container">
                  <QRCodeSVG
                    id="operoo-guest-qr"
                    value={GUEST_URL}
                    size={200}
                    level="H"
                    includeMargin
                  />
                </div>
              </div>

              {/* Info */}
              <div className="space-y-5">
                <div>
                  <h2 className="text-lg font-bold mb-1">{t('qrCodes.guestAccess')}</h2>
                  <p className="text-sm text-muted-foreground leading-relaxed">{t('qrCodes.universalDesc')}</p>
                </div>

                {/* Link */}
                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground">{t('qrCodes.link')}</Label>
                  <div className="flex items-center gap-2">
                    <Input value={GUEST_URL} readOnly className="text-sm h-9" data-testid="guest-link-input" />
                    <Button size="sm" variant="outline" className="shrink-0 h-9 gap-1.5" onClick={copyLink} data-testid="copy-link-button">
                      {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                      {copied ? t('qrCodes.copied') : t('qrCodes.copy')}
                    </Button>
                  </div>
                </div>

                {/* Actions */}
                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" className="gap-2" onClick={downloadQR} data-testid="download-qr-button">
                    <Download className="h-4 w-4" />
                    {t('qrCodes.download')}
                  </Button>
                  <Button variant="outline" className="gap-2" onClick={handlePrint} data-testid="print-qr-button">
                    <Printer className="h-4 w-4" />
                    {t('qrCodes.print')}
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* How It Works */}
        <Card data-testid="how-it-works-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold">{t('qrCodes.howItWorks')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                { step: '1', title: t('qrCodes.step1Title'), desc: t('qrCodes.step1Desc') },
                { step: '2', title: t('qrCodes.step2Title'), desc: t('qrCodes.step2Desc') },
                { step: '3', title: t('qrCodes.step3Title'), desc: t('qrCodes.step3Desc') },
              ].map(({ step, title, desc }) => (
                <div key={step} className="flex gap-3" data-testid={`step-${step}`}>
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-bold">
                    {step}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{title}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Instructions */}
        <Card data-testid="instructions-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold">{t('qrCodes.instructions')}</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {[t('qrCodes.instruction1'), t('qrCodes.instruction2'), t('qrCodes.instruction3')].map((text, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                  <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                  {text}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Tip */}
        <Card className="border-primary/20 bg-primary/5" data-testid="tip-card">
          <CardContent className="p-4 flex items-start gap-3">
            <QrCode className="h-5 w-5 text-primary shrink-0 mt-0.5" />
            <p className="text-sm text-muted-foreground leading-relaxed">{t('qrCodes.tip')}</p>
          </CardContent>
        </Card>
      </div>

      {/* ─── Print Layout ─── */}
      {showPrint && (
        <div className="fixed inset-0 z-50 bg-white hidden print:flex flex-col items-center justify-center" ref={printRef}>
          <style>{`
            @media print {
              body * { visibility: hidden !important; }
              [data-print-layout], [data-print-layout] * { visibility: visible !important; }
              [data-print-layout] { position: fixed; inset: 0; display: flex !important; }
            }
          `}</style>
        </div>
      )}
      <div
        data-print-layout="true"
        className="hidden print:flex fixed inset-0 z-[9999] bg-white flex-col items-center justify-center p-12"
      >
        <div className="text-center max-w-md mx-auto">
          <Logo size="lg" className="mx-auto mb-10" />
          <div className="mb-8">
            <QRCodeSVG value={GUEST_URL} size={280} level="H" includeMargin />
          </div>
          <h1 className="text-3xl font-bold tracking-tight mb-3">Scan to contact Front Desk</h1>
          <p className="text-lg text-gray-500">Enter your room or table number</p>
        </div>
      </div>
    </>
  );
}
