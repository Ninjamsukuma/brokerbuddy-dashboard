
import React from 'react';
import { Bell } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";

interface NotificationsDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const NotificationsDialog: React.FC<NotificationsDialogProps> = ({ isOpen, onOpenChange }) => {
  const { t } = useLanguage();

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{t('notifications')}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 max-h-[60vh] overflow-y-auto">
          {[1, 2, 3].map((i) => (
            <div key={i} className="border-b pb-3">
              <h4 className="font-medium">{t('notificationTitle')}</h4>
              <p className="text-sm text-gray-500">{t('notificationDesc')}</p>
              <p className="text-xs text-gray-400 mt-1">2h ago</p>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NotificationsDialog;
