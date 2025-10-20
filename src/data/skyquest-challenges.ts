import { QuestMode } from '@/types/skyquest';

export const calmModeData: QuestMode = {
  id: 'calm',
  name: 'Mây Mây Sương Sương',
  description: 'Trải nghiệm nhẹ nhàng và cảm xúc cùng thiên nhiên Tà Xùa',
  theme: {
    primaryColor: '#E0F2FE', // sky-100
    secondaryColor: '#BAE6FD', // sky-200
    accentColor: '#C4B5FD', // violet-300
    backgroundColor: '#FEFEFE',
    textColor: '#475569' // slate-600
  },
  challenges: [
    {
      id: 'calm-1',
      title: 'Ngắm mây 15 phút',
      description: 'Ngắm mây 15 phút và ghi lại 3 điều khiến bạn thấy bình yên',
      icon: '☁️',
      points: 30,
      proofPolicy: 'optional',
      proofType: 'text',
      completed: false,
      progress: 0
    },
    {
      id: 'calm-2',
      title: 'Chụp ánh sáng buổi sáng',
      description: 'Chụp ánh sáng buổi sáng sớm và đặt cho nó một cái tên',
      icon: '🌅',
      points: 25,
      proofPolicy: 'optional',
      proofType: 'photo',
      completed: false,
      progress: 0
    },
    {
      id: 'calm-3',
      title: 'Lắng nghe gió qua rừng thông',
      description: 'Lắng nghe gió qua rừng thông và viết lại cảm xúc',
      icon: '🌲',
      points: 35,
      proofPolicy: 'none',
      completed: false,
      progress: 0
    },
    {
      id: 'calm-4',
      title: 'Hít thở sâu',
      description: 'Hít thở sâu và đánh dấu khoảnh khắc yên tĩnh',
      icon: '🧘',
      points: 20,
      proofPolicy: 'none',
      completed: false,
      progress: 0
    },
    {
      id: 'calm-5',
      title: 'Viết lời cảm ơn',
      description: 'Viết lời cảm ơn dành cho thiên nhiên',
      icon: '💌',
      points: 40,
      proofPolicy: 'optional',
      proofType: 'text',
      completed: false,
      progress: 0
    }
  ]
};

export const energeticModeData: QuestMode = {
  id: 'energetic',
  name: 'Hăng Say Săn Thưởng',
  description: 'Hành động tích cực để bảo vệ môi trường Tà Xùa',
  theme: {
    primaryColor: '#16A34A', // green-600
    secondaryColor: '#FB923C', // orange-400
    accentColor: '#FCD34D', // yellow-300
    backgroundColor: '#F8FAFC',
    textColor: '#1E293B' // slate-800
  },
  challenges: [
    {
      id: 'energetic-1',
      title: 'Nhặt rác dọc đường mòn',
      description: 'Nhặt rác dọc đường mòn trong 10 phút, chụp ảnh minh chứng',
      icon: '🗑️',
      points: 80,
      proofPolicy: 'required',
      proofType: 'photo',
      completed: false,
      progress: 0
    },
    {
      id: 'energetic-2',
      title: 'Trồng cây non',
      description: 'Trồng một cây non tại khu vực chỉ định, checkin GPS',
      icon: '🌱',
      points: 120,
      proofPolicy: 'required',
      proofType: 'gps',
      completed: false,
      progress: 0
    },
    {
      id: 'energetic-3',
      title: 'Phỏng vấn người dân',
      description: 'Phỏng vấn người dân về việc gìn giữ môi trường',
      icon: '🎤',
      points: 100,
      proofPolicy: 'required',
      proofType: 'photo',
      completed: false,
      progress: 0
    },
    {
      id: 'energetic-4',
      title: 'Chụp ảnh khung cảnh sạch',
      description: 'Chụp ảnh khung cảnh không rác và đăng lên mạng xã hội kèm #TaXuaXanh',
      icon: '📸',
      points: 90,
      proofPolicy: 'required',
      proofType: 'social',
      completed: false,
      progress: 0
    },
    {
      id: 'energetic-5',
      title: 'Viết cảm nhận hành trình',
      description: 'Viết lại điều bạn tự hào nhất sau hành trình',
      icon: '✍️',
      points: 60,
      proofPolicy: 'optional',
      proofType: 'text',
      completed: false,
      progress: 0
    }
  ]
};

export const questModes = [calmModeData, energeticModeData];