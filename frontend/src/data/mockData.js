export const mockStaff = [
  { id: 'staff_1', name: 'Maria Rossi', email: 'maria@operoo.com', role: 'Manager', department: 'reception', phone: '+39 333 1234567', shift: 'morning', status: 'active', avatar: 'MR' },
  { id: 'staff_2', name: 'Luca Bianchi', email: 'luca@operoo.com', role: 'Concierge', department: 'reception', phone: '+39 333 2345678', shift: 'afternoon', status: 'active', avatar: 'LB' },
  { id: 'staff_3', name: 'Giulia Verdi', email: 'giulia@operoo.com', role: 'Housekeeper', department: 'housekeeping', phone: '+39 333 3456789', shift: 'morning', status: 'active', avatar: 'GV' },
  { id: 'staff_4', name: 'Marco Ferrari', email: 'marco@operoo.com', role: 'Chef', department: 'kitchen', phone: '+39 333 4567890', shift: 'evening', status: 'active', avatar: 'MF' },
  { id: 'staff_5', name: 'Sofia Romano', email: 'sofia@operoo.com', role: 'Spa Therapist', department: 'spa', phone: '+39 333 5678901', shift: 'morning', status: 'onLeave', avatar: 'SR' },
  { id: 'staff_6', name: 'Andrea Colombo', email: 'andrea@operoo.com', role: 'Bartender', department: 'restaurant', phone: '+39 333 6789012', shift: 'evening', status: 'active', avatar: 'AC' },
  { id: 'staff_7', name: 'Elena Ricci', email: 'elena@operoo.com', role: 'Receptionist', department: 'reception', phone: '+39 333 7890123', shift: 'night', status: 'active', avatar: 'ER' },
  { id: 'staff_8', name: 'Paolo Marino', email: 'paolo@operoo.com', role: 'Maintenance Tech', department: 'maintenance', phone: '+39 333 8901234', shift: 'morning', status: 'active', avatar: 'PM' },
  { id: 'staff_9', name: 'Chiara Gallo', email: 'chiara@operoo.com', role: 'Waitress', department: 'restaurant', phone: '+39 333 9012345', shift: 'afternoon', status: 'inactive', avatar: 'CG' },
  { id: 'staff_10', name: 'Roberto Conti', email: 'roberto@operoo.com', role: 'Security Guard', department: 'security', phone: '+39 333 0123456', shift: 'night', status: 'active', avatar: 'RC' },
  { id: 'staff_11', name: 'Anna Bruno', email: 'anna@operoo.com', role: 'Sous Chef', department: 'kitchen', phone: '+39 334 1234567', shift: 'afternoon', status: 'active', avatar: 'AB' },
  { id: 'staff_12', name: 'Davide Greco', email: 'davide@operoo.com', role: 'Pool Attendant', department: 'spa', phone: '+39 334 2345678', shift: 'morning', status: 'active', avatar: 'DG' },
];

export const mockActivity = [
  { id: 1, type: 'clock-in', message: 'Maria Rossi clocked in', time: '2 min ago', icon: 'clock' },
  { id: 2, type: 'guest', message: 'New guest check-in — Room 204', time: '15 min ago', icon: 'user' },
  { id: 3, type: 'appointment', message: 'Spa booking confirmed — 3:00 PM', time: '32 min ago', icon: 'calendar' },
  { id: 4, type: 'order', message: 'Room service order #1042 delivered', time: '1 hr ago', icon: 'package' },
  { id: 5, type: 'clock-out', message: 'Luca Bianchi clocked out', time: '1 hr ago', icon: 'clock' },
  { id: 6, type: 'guest', message: 'Guest check-out — Room 118', time: '2 hrs ago', icon: 'user' },
];

export const departments = [
  'reception', 'housekeeping', 'restaurant', 'kitchen', 'spa', 'maintenance', 'security', 'management',
];

export const shifts = ['morning', 'afternoon', 'evening', 'night'];

export const statuses = ['active', 'inactive', 'onLeave'];

// --- Staff-specific mock data ---

export const mockTasks = [
  { id: 'task_1', title: 'Prepare Room 302 for VIP arrival', description: 'Full deep clean, fresh flowers, welcome amenities basket.', status: 'in-progress', priority: 'high', assignedBy: 'Maria Rossi', dueDate: 'Today, 2:00 PM', category: 'housekeeping' },
  { id: 'task_2', title: 'Restock minibar — Floor 3', description: 'Replace all consumed items in rooms 301-312.', status: 'pending', priority: 'medium', assignedBy: 'Maria Rossi', dueDate: 'Today, 4:00 PM', category: 'housekeeping' },
  { id: 'task_3', title: 'Fix AC unit in Room 118', description: 'Guest reported the AC is making unusual noise.', status: 'pending', priority: 'high', assignedBy: 'Paolo Marino', dueDate: 'Today, 12:00 PM', category: 'maintenance' },
  { id: 'task_4', title: 'Set up conference room B', description: 'Arrange tables for 20 guests, projector, water service.', status: 'completed', priority: 'medium', assignedBy: 'Maria Rossi', dueDate: 'Today, 9:00 AM', category: 'setup' },
  { id: 'task_5', title: 'Deliver laundry to Room 205', description: 'Express laundry service — 2 shirts, 1 suit.', status: 'completed', priority: 'low', assignedBy: 'Elena Ricci', dueDate: 'Today, 10:00 AM', category: 'housekeeping' },
  { id: 'task_6', title: 'Inventory check — cleaning supplies', description: 'Monthly inventory of all housekeeping supplies on floor 2.', status: 'pending', priority: 'low', assignedBy: 'Maria Rossi', dueDate: 'Tomorrow, 11:00 AM', category: 'inventory' },
  { id: 'task_7', title: 'Pool area evening setup', description: 'Set up lounge chairs, towels, and lighting for evening event.', status: 'pending', priority: 'medium', assignedBy: 'Davide Greco', dueDate: 'Today, 5:00 PM', category: 'setup' },
  { id: 'task_8', title: 'Replace light bulbs — Lobby', description: '3 spotlights need replacement near entrance.', status: 'in-progress', priority: 'low', assignedBy: 'Paolo Marino', dueDate: 'Today, 3:00 PM', category: 'maintenance' },
];

export const mockShift = {
  today: { date: 'Today', startTime: '07:00', endTime: '15:00', location: 'Floor 2 — Housekeeping', type: 'morning' },
  tomorrow: { date: 'Tomorrow', startTime: '07:00', endTime: '15:00', location: 'Floor 3 — Housekeeping', type: 'morning' },
};

export const mockCalendarEvents = [
  { id: 'ev_1', title: 'Morning Shift', date: '2026-04-14', startTime: '07:00', endTime: '15:00', type: 'shift', color: 'primary' },
  { id: 'ev_2', title: 'Morning Shift', date: '2026-04-15', startTime: '07:00', endTime: '15:00', type: 'shift', color: 'primary' },
  { id: 'ev_3', title: 'Morning Shift', date: '2026-04-16', startTime: '07:00', endTime: '15:00', type: 'shift', color: 'primary' },
  { id: 'ev_4', title: 'Morning Shift', date: '2026-04-17', startTime: '07:00', endTime: '15:00', type: 'shift', color: 'primary' },
  { id: 'ev_5', title: 'Morning Shift', date: '2026-04-18', startTime: '07:00', endTime: '15:00', type: 'shift', color: 'primary' },
  { id: 'ev_6', title: 'Day Off', date: '2026-04-19', startTime: '', endTime: '', type: 'dayoff', color: 'muted' },
  { id: 'ev_7', title: 'Day Off', date: '2026-04-20', startTime: '', endTime: '', type: 'dayoff', color: 'muted' },
  { id: 'ev_8', title: 'Morning Shift', date: '2026-04-21', startTime: '07:00', endTime: '15:00', type: 'shift', color: 'primary' },
  { id: 'ev_9', title: 'Team Meeting', date: '2026-04-15', startTime: '08:30', endTime: '09:00', type: 'appointment', color: 'blue' },
  { id: 'ev_10', title: 'Training: Fire Safety', date: '2026-04-17', startTime: '14:00', endTime: '15:00', type: 'appointment', color: 'amber' },
  { id: 'ev_11', title: 'Performance Review', date: '2026-04-22', startTime: '10:00', endTime: '10:30', type: 'appointment', color: 'blue' },
];
