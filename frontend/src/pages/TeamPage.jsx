import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent } from '@/components/ui/card';
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
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table';
import { Plus, Search, MoreHorizontal, Pencil, Trash2, UserPlus, Shield, Users } from 'lucide-react';

const roleColors = {
  admin: 'bg-primary/10 text-primary border-primary/20',
  manager: 'bg-blue-50 text-blue-700 border-blue-200',
  staff: 'bg-amber-50 text-amber-700 border-amber-200',
};

const initialMembers = [
  { id: 'tm_1', name: 'Admin', email: 'admin@operoo.com', role: 'admin', department: 'Management', status: 'active', joinedAt: '2026-01-15' },
  { id: 'tm_2', name: 'Maria Rossi', email: 'maria@operoo.com', role: 'manager', department: 'Reception', status: 'active', joinedAt: '2026-02-01' },
  { id: 'tm_3', name: 'Luca Bianchi', email: 'luca@operoo.com', role: 'staff', department: 'Reception', status: 'active', joinedAt: '2026-02-10' },
  { id: 'tm_4', name: 'Giulia Verdi', email: 'giulia@operoo.com', role: 'staff', department: 'Housekeeping', status: 'active', joinedAt: '2026-03-01' },
  { id: 'tm_5', name: 'Marco Ferrari', email: 'marco@operoo.com', role: 'staff', department: 'Kitchen', status: 'active', joinedAt: '2026-03-15' },
  { id: 'tm_6', name: 'Elena Ricci', email: 'elena@operoo.com', role: 'manager', department: 'Spa & Wellness', status: 'active', joinedAt: '2026-04-01' },
];

const emptyForm = { name: '', email: '', role: 'staff', department: '' };
const roles = ['admin', 'manager', 'staff'];

export default function TeamPage() {
  const { t } = useTranslation();
  const [members, setMembers] = useState(initialMembers);
  const [search, setSearch] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);

  const filtered = useMemo(() => {
    return members.filter((m) => {
      const matchSearch = !search || m.name.toLowerCase().includes(search.toLowerCase()) || m.email.toLowerCase().includes(search.toLowerCase());
      const matchRole = filterRole === 'all' || m.role === filterRole;
      return matchSearch && matchRole;
    });
  }, [members, search, filterRole]);

  const counts = { admin: members.filter((m) => m.role === 'admin').length, manager: members.filter((m) => m.role === 'manager').length, staff: members.filter((m) => m.role === 'staff').length };

  const openCreate = () => { setEditing(null); setForm(emptyForm); setDialogOpen(true); };
  const openEdit = (m) => { setEditing(m); setForm({ name: m.name, email: m.email, role: m.role, department: m.department }); setDialogOpen(true); };
  const openDelete = (m) => { setEditing(m); setDeleteOpen(true); };

  const handleSave = () => {
    if (!form.name || !form.email || !form.role) return;
    if (editing) {
      setMembers((prev) => prev.map((m) => m.id === editing.id ? { ...m, ...form } : m));
    } else {
      setMembers((prev) => [...prev, { id: `tm_${Date.now()}`, ...form, status: 'active', joinedAt: new Date().toISOString().split('T')[0] }]);
    }
    setDialogOpen(false);
  };

  const handleDelete = () => {
    if (editing) setMembers((prev) => prev.filter((m) => m.id !== editing.id));
    setDeleteOpen(false);
    setEditing(null);
  };

  const update = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  return (
    <div className="space-y-6" data-testid="team-page">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight" data-testid="team-title">{t('team.title')}</h1>
          <p className="text-sm text-muted-foreground mt-1">{t('team.subtitle')}</p>
        </div>
        <Button className="gap-2 shrink-0" onClick={openCreate} data-testid="invite-user-button">
          <UserPlus className="h-4 w-4" />
          {t('team.inviteUser')}
        </Button>
      </div>

      {/* Role Summary */}
      <div className="grid gap-3 grid-cols-3">
        {roles.map((role) => (
          <Card key={role} data-testid={`role-count-${role}`}>
            <CardContent className="p-4 flex items-center gap-3">
              <div className={`rounded-lg p-2 ${role === 'admin' ? 'bg-primary/10' : role === 'manager' ? 'bg-blue-50' : 'bg-amber-50'}`}>
                <Shield className={`h-4 w-4 ${role === 'admin' ? 'text-primary' : role === 'manager' ? 'text-blue-600' : 'text-amber-600'}`} />
              </div>
              <div>
                <p className="text-xl font-bold">{counts[role]}</p>
                <p className="text-xs text-muted-foreground capitalize">{t(`team.${role}`)}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder={t('team.searchPlaceholder')} value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" data-testid="team-search" />
            </div>
            <Select value={filterRole} onValueChange={setFilterRole}>
              <SelectTrigger className="w-full sm:w-40" data-testid="filter-role">
                <SelectValue placeholder={t('team.allRoles')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t('team.allRoles')}</SelectItem>
                {roles.map((r) => <SelectItem key={r} value={r}>{t(`team.${r}`)}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Count */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Users className="h-4 w-4" />
        <span data-testid="team-count">{t('team.memberCount', { count: filtered.length })}</span>
      </div>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          {/* Desktop */}
          <div className="hidden md:block">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="pl-4">{t('team.name')}</TableHead>
                  <TableHead>{t('team.role')}</TableHead>
                  <TableHead>{t('team.department')}</TableHead>
                  <TableHead>{t('team.joined')}</TableHead>
                  <TableHead className="text-right pr-4">{t('staff.actions')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.length === 0 ? (
                  <TableRow><TableCell colSpan={5} className="text-center py-10 text-muted-foreground">{t('team.noMembers')}</TableCell></TableRow>
                ) : filtered.map((m) => (
                  <TableRow key={m.id} data-testid={`team-row-${m.id}`}>
                    <TableCell className="pl-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-semibold">
                          {m.name.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-medium text-sm">{m.name}</p>
                          <p className="text-xs text-muted-foreground">{m.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={`capitalize text-[11px] ${roleColors[m.role]}`} data-testid={`role-badge-${m.id}`}>
                        {t(`team.${m.role}`)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm">{m.department}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{m.joinedAt}</TableCell>
                    <TableCell className="text-right pr-4">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8" data-testid={`team-actions-${m.id}`}>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => openEdit(m)} data-testid={`edit-member-${m.id}`}>
                            <Pencil className="h-3.5 w-3.5 mr-2" /> {t('common.edit')}
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => openDelete(m)} className="text-destructive" data-testid={`delete-member-${m.id}`}>
                            <Trash2 className="h-3.5 w-3.5 mr-2" /> {t('common.delete')}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Mobile */}
          <div className="md:hidden divide-y">
            {filtered.length === 0 ? (
              <div className="text-center py-10 text-muted-foreground">{t('team.noMembers')}</div>
            ) : filtered.map((m) => (
              <div key={m.id} className="p-4 flex items-center gap-3" data-testid={`team-mobile-${m.id}`}>
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-semibold">
                  {m.name.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">{m.name}</p>
                  <p className="text-xs text-muted-foreground">{m.email}</p>
                  <Badge variant="outline" className={`capitalize text-[10px] mt-1 ${roleColors[m.role]}`}>{t(`team.${m.role}`)}</Badge>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0"><MoreHorizontal className="h-4 w-4" /></Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => openEdit(m)}><Pencil className="h-3.5 w-3.5 mr-2" /> {t('common.edit')}</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => openDelete(m)} className="text-destructive"><Trash2 className="h-3.5 w-3.5 mr-2" /> {t('common.delete')}</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Create/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-md" data-testid="team-dialog">
          <DialogHeader>
            <DialogTitle>{editing ? t('team.editMember') : t('team.inviteUser')}</DialogTitle>
            <DialogDescription>{editing ? t('team.editDesc') : t('team.inviteDesc')}</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-2">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>{t('team.name')}</Label>
                <Input value={form.name} onChange={(e) => update('name', e.target.value)} data-testid="member-name" />
              </div>
              <div className="space-y-2">
                <Label>{t('team.email')}</Label>
                <Input type="email" value={form.email} onChange={(e) => update('email', e.target.value)} data-testid="member-email" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>{t('team.role')}</Label>
                <Select value={form.role} onValueChange={(v) => update('role', v)}>
                  <SelectTrigger data-testid="member-role"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {roles.map((r) => <SelectItem key={r} value={r}>{t(`team.${r}`)}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>{t('team.department')}</Label>
                <Input value={form.department} onChange={(e) => update('department', e.target.value)} data-testid="member-department" />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)} data-testid="member-cancel">{t('common.cancel')}</Button>
            <Button onClick={handleSave} data-testid="member-save">{editing ? t('common.save') : t('team.invite')}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <DialogContent className="sm:max-w-md" data-testid="team-delete-dialog">
          <DialogHeader>
            <DialogTitle>{t('team.removeMember')}</DialogTitle>
            <DialogDescription>{t('team.removeConfirm')}</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteOpen(false)} data-testid="delete-member-cancel">{t('common.cancel')}</Button>
            <Button variant="destructive" onClick={handleDelete} data-testid="delete-member-confirm">{t('common.delete')}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
