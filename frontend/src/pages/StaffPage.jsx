import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/contexts/AuthContext';
import { mockStaff as initialStaff, departments, shifts, statuses } from '@/data/mockData';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter,
} from '@/components/ui/dialog';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Plus, Search, MoreHorizontal, Pencil, Trash2, Users } from 'lucide-react';

const statusVariant = { active: 'default', inactive: 'secondary', onLeave: 'outline' };

const emptyForm = { name: '', email: '', role: '', department: 'reception', phone: '', shift: 'morning', status: 'active' };

export default function StaffPage() {
  const { t } = useTranslation();
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';
  const [staff, setStaff] = useState(initialStaff);
  const [search, setSearch] = useState('');
  const [filterDept, setFilterDept] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editingStaff, setEditingStaff] = useState(null);
  const [form, setForm] = useState(emptyForm);

  const filtered = useMemo(() => {
    return staff.filter((s) => {
      const matchSearch = !search || s.name.toLowerCase().includes(search.toLowerCase()) || s.email.toLowerCase().includes(search.toLowerCase()) || s.role.toLowerCase().includes(search.toLowerCase());
      const matchDept = filterDept === 'all' || s.department === filterDept;
      const matchStatus = filterStatus === 'all' || s.status === filterStatus;
      return matchSearch && matchDept && matchStatus;
    });
  }, [staff, search, filterDept, filterStatus]);

  const openAdd = () => { setEditingStaff(null); setForm(emptyForm); setDialogOpen(true); };
  const openEdit = (member) => { setEditingStaff(member); setForm({ name: member.name, email: member.email, role: member.role, department: member.department, phone: member.phone, shift: member.shift, status: member.status }); setDialogOpen(true); };
  const openDelete = (member) => { setEditingStaff(member); setDeleteOpen(true); };

  const handleSave = () => {
    if (!form.name || !form.email || !form.role) return;
    if (editingStaff) {
      setStaff((prev) => prev.map((s) => s.id === editingStaff.id ? { ...s, ...form, avatar: form.name.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase() } : s));
    } else {
      const newId = `staff_${Date.now()}`;
      setStaff((prev) => [...prev, { id: newId, ...form, avatar: form.name.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase() }]);
    }
    setDialogOpen(false);
  };

  const handleDelete = () => {
    if (editingStaff) {
      setStaff((prev) => prev.filter((s) => s.id !== editingStaff.id));
    }
    setDeleteOpen(false);
    setEditingStaff(null);
  };

  const updateForm = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  return (
    <div className="space-y-6" data-testid="staff-page">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight" data-testid="staff-title">{t('staff.title')}</h1>
          <p className="text-sm text-muted-foreground mt-1">{t('staff.subtitle')}</p>
        </div>
        {isAdmin && (
          <Button className="gap-2 shrink-0" onClick={openAdd} data-testid="add-staff-button">
            <Plus className="h-4 w-4" />
            {t('staff.addStaff')}
          </Button>
        )}
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={t('staff.searchPlaceholder')}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
                data-testid="staff-search"
              />
            </div>
            <Select value={filterDept} onValueChange={setFilterDept}>
              <SelectTrigger className="w-full sm:w-44" data-testid="filter-department">
                <SelectValue placeholder={t('staff.allDepartments')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t('staff.allDepartments')}</SelectItem>
                {departments.map((d) => (
                  <SelectItem key={d} value={d}>{t(`staff.${d}`)}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full sm:w-40" data-testid="filter-status">
                <SelectValue placeholder={t('staff.allStatuses')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t('staff.allStatuses')}</SelectItem>
                {statuses.map((s) => (
                  <SelectItem key={s} value={s}>{t(`staff.${s}`)}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Count */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Users className="h-4 w-4" />
        <span data-testid="staff-count">{t('staff.staffCount', { count: filtered.length })}</span>
      </div>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          {/* Desktop table */}
          <div className="hidden md:block">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="pl-4">{t('staff.name')}</TableHead>
                  <TableHead>{t('staff.role')}</TableHead>
                  <TableHead>{t('staff.department')}</TableHead>
                  <TableHead>{t('staff.shift')}</TableHead>
                  <TableHead>{t('staff.status')}</TableHead>
                  {isAdmin && <TableHead className="text-right pr-4">{t('staff.actions')}</TableHead>}
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-10 text-muted-foreground">{t('staff.noStaffFound')}</TableCell>
                  </TableRow>
                ) : (
                  filtered.map((member) => (
                    <TableRow key={member.id} data-testid={`staff-row-${member.id}`}>
                      <TableCell className="pl-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-semibold">
                            {member.avatar}
                          </div>
                          <div>
                            <p className="font-medium text-sm">{member.name}</p>
                            <p className="text-xs text-muted-foreground">{member.email}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm">{member.role}</TableCell>
                      <TableCell className="text-sm">{t(`staff.${member.department}`)}</TableCell>
                      <TableCell className="text-sm">{t(`staff.${member.shift}`)}</TableCell>
                      <TableCell>
                        <Badge variant={statusVariant[member.status]}>{t(`staff.${member.status}`)}</Badge>
                      </TableCell>
                      {isAdmin && (
                        <TableCell className="text-right pr-4">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8" data-testid={`staff-actions-${member.id}`}>
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => openEdit(member)} data-testid={`edit-${member.id}`}>
                                <Pencil className="h-3.5 w-3.5 mr-2" /> {t('common.edit')}
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => openDelete(member)} className="text-destructive" data-testid={`delete-${member.id}`}>
                                <Trash2 className="h-3.5 w-3.5 mr-2" /> {t('common.delete')}
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      )}
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          {/* Mobile cards */}
          <div className="md:hidden divide-y">
            {filtered.length === 0 ? (
              <div className="text-center py-10 text-muted-foreground">{t('staff.noStaffFound')}</div>
            ) : (
              filtered.map((member) => (
                <div key={member.id} className="p-4 flex items-center gap-3" data-testid={`staff-mobile-${member.id}`}>
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-semibold">
                    {member.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{member.name}</p>
                    <p className="text-xs text-muted-foreground">{member.role} &middot; {t(`staff.${member.department}`)}</p>
                    <div className="mt-1">
                      <Badge variant={statusVariant[member.status]} className="text-[10px] px-1.5 py-0">{t(`staff.${member.status}`)}</Badge>
                    </div>
                  </div>
                  {isAdmin && (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => openEdit(member)}>
                          <Pencil className="h-3.5 w-3.5 mr-2" /> {t('common.edit')}
                        </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => openDelete(member)} className="text-destructive">
                        <Trash2 className="h-3.5 w-3.5 mr-2" /> {t('common.delete')}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  )}
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* Add/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-lg" data-testid="staff-dialog">
          <DialogHeader>
            <DialogTitle>{editingStaff ? t('staff.editStaff') : t('staff.addStaff')}</DialogTitle>
            <DialogDescription>{editingStaff ? t('staff.editStaff') : t('staff.addStaff')}</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-2">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>{t('staff.name')}</Label>
                <Input value={form.name} onChange={(e) => updateForm('name', e.target.value)} data-testid="form-name" />
              </div>
              <div className="space-y-2">
                <Label>{t('staff.email')}</Label>
                <Input type="email" value={form.email} onChange={(e) => updateForm('email', e.target.value)} data-testid="form-email" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>{t('staff.role')}</Label>
                <Input value={form.role} onChange={(e) => updateForm('role', e.target.value)} data-testid="form-role" />
              </div>
              <div className="space-y-2">
                <Label>{t('staff.phone')}</Label>
                <Input value={form.phone} onChange={(e) => updateForm('phone', e.target.value)} data-testid="form-phone" />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>{t('staff.department')}</Label>
                <Select value={form.department} onValueChange={(v) => updateForm('department', v)}>
                  <SelectTrigger data-testid="form-department"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {departments.map((d) => <SelectItem key={d} value={d}>{t(`staff.${d}`)}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>{t('staff.shift')}</Label>
                <Select value={form.shift} onValueChange={(v) => updateForm('shift', v)}>
                  <SelectTrigger data-testid="form-shift"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {shifts.map((s) => <SelectItem key={s} value={s}>{t(`staff.${s}`)}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>{t('staff.status')}</Label>
                <Select value={form.status} onValueChange={(v) => updateForm('status', v)}>
                  <SelectTrigger data-testid="form-status"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {statuses.map((s) => <SelectItem key={s} value={s}>{t(`staff.${s}`)}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)} data-testid="form-cancel">{t('common.cancel')}</Button>
            <Button onClick={handleSave} data-testid="form-save">{t('common.save')}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <DialogContent className="sm:max-w-md" data-testid="delete-dialog">
          <DialogHeader>
            <DialogTitle>{t('staff.deleteStaff')}</DialogTitle>
            <DialogDescription>{t('staff.deleteConfirm')}</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteOpen(false)} data-testid="delete-cancel">{t('common.cancel')}</Button>
            <Button variant="destructive" onClick={handleDelete} data-testid="delete-confirm">{t('common.delete')}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
