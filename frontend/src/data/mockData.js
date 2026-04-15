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
