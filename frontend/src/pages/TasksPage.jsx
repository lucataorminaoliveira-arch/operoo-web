import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { mockTasks } from '@/data/mockData';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Circle, Loader2, CheckCircle2, ListChecks, User, Clock,
} from 'lucide-react';

const statusIcons = {
  'pending': { icon: Circle, color: 'text-amber-600', bg: 'bg-amber-50' },
  'in-progress': { icon: Loader2, color: 'text-blue-600', bg: 'bg-blue-50' },
  'completed': { icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50' },
};

const priorityVariant = { high: 'destructive', medium: 'secondary', low: 'outline' };

export default function TasksPage() {
  const { t } = useTranslation();
  const [tasks, setTasks] = useState(mockTasks);
  const [activeTab, setActiveTab] = useState('all');

  const filtered = useMemo(() => {
    if (activeTab === 'all') return tasks;
    return tasks.filter((task) => task.status === activeTab);
  }, [tasks, activeTab]);

  const updateTaskStatus = (taskId, newStatus) => {
    setTasks((prev) => prev.map((t) => t.id === taskId ? { ...t, status: newStatus } : t));
  };

  const counts = {
    all: tasks.length,
    pending: tasks.filter((t) => t.status === 'pending').length,
    'in-progress': tasks.filter((t) => t.status === 'in-progress').length,
    completed: tasks.filter((t) => t.status === 'completed').length,
  };

  return (
    <div className="space-y-6" data-testid="tasks-page">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight" data-testid="tasks-title">{t('tasks.title')}</h1>
        <p className="text-sm text-muted-foreground mt-1">{t('tasks.subtitle')}</p>
      </div>

      {/* Filter Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList data-testid="task-tabs">
          <TabsTrigger value="all" data-testid="tab-all">{t('tasks.all')} ({counts.all})</TabsTrigger>
          <TabsTrigger value="pending" data-testid="tab-pending">{t('tasks.pending')} ({counts.pending})</TabsTrigger>
          <TabsTrigger value="in-progress" data-testid="tab-inprogress">{t('tasks.inProgress')} ({counts['in-progress']})</TabsTrigger>
          <TabsTrigger value="completed" data-testid="tab-completed">{t('tasks.completed')} ({counts.completed})</TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Count */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <ListChecks className="h-4 w-4" />
        <span data-testid="task-count">{t('tasks.taskCount', { count: filtered.length })}</span>
      </div>

      {/* Task List */}
      {filtered.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center text-muted-foreground">{t('tasks.noTasks')}</CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {filtered.map((task) => {
            const { icon: StatusIcon, color, bg } = statusIcons[task.status];
            return (
              <Card key={task.id} data-testid={`task-card-${task.id}`}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    {/* Status Icon */}
                    <div className={`mt-0.5 rounded-full p-1.5 ${bg}`}>
                      <StatusIcon className={`h-4 w-4 ${color}`} />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="font-medium text-sm leading-snug">{task.title}</p>
                          <p className="text-xs text-muted-foreground mt-1 line-clamp-1">{task.description}</p>
                        </div>
                        <Badge variant={priorityVariant[task.priority]} className="shrink-0 text-[10px]" data-testid={`priority-${task.id}`}>
                          {t(`tasks.${task.priority}`)}
                        </Badge>
                      </div>

                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2.5 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <User className="h-3 w-3" /> {t('tasks.assignedBy')} {task.assignedBy}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" /> {t('tasks.due')} {task.dueDate}
                        </span>
                      </div>

                      {/* Action Buttons */}
                      {task.status !== 'completed' && (
                        <div className="flex gap-2 mt-3">
                          {task.status === 'pending' && (
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-7 text-xs"
                              onClick={() => updateTaskStatus(task.id, 'in-progress')}
                              data-testid={`start-${task.id}`}
                            >
                              {t('tasks.markInProgress')}
                            </Button>
                          )}
                          <Button
                            size="sm"
                            className="h-7 text-xs"
                            onClick={() => updateTaskStatus(task.id, 'completed')}
                            data-testid={`complete-${task.id}`}
                          >
                            {t('tasks.markDone')}
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
