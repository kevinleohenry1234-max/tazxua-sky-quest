// Narrative Adventure System Data for Tà Xùa Sky Quest

import { OnboardingQuestion, Journey, MiniQuest } from '../types/narrativeAdventure';

// Onboarding Questions to determine user archetype
export const ONBOARDING_QUESTIONS: OnboardingQuestion[] = [
  {
    id: 'location',
    question: 'Bạn đang ở khu vực nào của Tà Xùa?',
    type: 'single_choice',
    weight: 0.5,
    options: [
      {
        id: 'peak',
        text: 'Gần đỉnh núi và các điểm cao',
        icon: '🏔️',
        archetypeWeights: {
          protector: 2,
          observer: 3,
          storyteller: 1,
          creator: 3
        }
      },
      {
        id: 'village',
        text: 'Trong các làng bản địa phương',
        icon: '🏘️',
        archetypeWeights: {
          protector: 2,
          observer: 2,
          storyteller: 3,
          creator: 2
        }
      },
      {
        id: 'forest',
        text: 'Khu vực rừng và thiên nhiên hoang dã',
        icon: '🌲',
        archetypeWeights: {
          protector: 3,
          observer: 3,
          storyteller: 1,
          creator: 2
        }
      },
      {
        id: 'homestay',
        text: 'Tại homestay hoặc khu nghỉ dưỡng',
        icon: '🏠',
        archetypeWeights: {
          protector: 1,
          observer: 2,
          storyteller: 2,
          creator: 1
        }
      }
    ]
  },
  {
    id: 'time_available',
    question: 'Bạn có bao nhiêu thời gian rảnh để tham gia hành trình?',
    type: 'single_choice',
    weight: 0.3,
    options: [
      {
        id: 'few_hours',
        text: 'Vài giờ trong ngày',
        icon: '⏰',
        archetypeWeights: {
          protector: 1,
          observer: 2,
          storyteller: 1,
          creator: 2
        }
      },
      {
        id: 'half_day',
        text: 'Nửa ngày (4-6 giờ)',
        icon: '🌅',
        archetypeWeights: {
          protector: 2,
          observer: 2,
          storyteller: 2,
          creator: 2
        }
      },
      {
        id: 'full_day',
        text: 'Cả ngày (8+ giờ)',
        icon: '☀️',
        archetypeWeights: {
          protector: 3,
          observer: 3,
          storyteller: 3,
          creator: 3
        }
      },
      {
        id: 'multiple_days',
        text: 'Nhiều ngày',
        icon: '📅',
        archetypeWeights: {
          protector: 3,
          observer: 3,
          storyteller: 3,
          creator: 2
        }
      }
    ]
  },
  {
    id: 'activity_preference',
    question: 'Bạn thích hoạt động ngoài trời hay trong nhà hơn?',
    type: 'single_choice',
    weight: 0.8,
    options: [
      {
        id: 'outdoor_active',
        text: 'Ngoài trời, năng động và thể chất',
        icon: '🥾',
        archetypeWeights: {
          protector: 3,
          observer: 1,
          storyteller: 2,
          creator: 2
        }
      },
      {
        id: 'outdoor_peaceful',
        text: 'Ngoài trời, yên tĩnh và thư giãn',
        icon: '🧘',
        archetypeWeights: {
          protector: 1,
          observer: 3,
          storyteller: 1,
          creator: 3
        }
      },
      {
        id: 'indoor_social',
        text: 'Trong nhà, giao tiếp và học hỏi',
        icon: '☕',
        archetypeWeights: {
          protector: 1,
          observer: 2,
          storyteller: 3,
          creator: 1
        }
      },
      {
        id: 'mixed',
        text: 'Kết hợp cả hai tùy tâm trạng',
        icon: '🌈',
        archetypeWeights: {
          protector: 2,
          observer: 2,
          storyteller: 2,
          creator: 2
        }
      }
    ]
  },
  {
    id: 'experience_goal',
    question: 'Bạn muốn cảm nhận Tà Xùa theo hướng nào?',
    type: 'single_choice',
    weight: 1.0,
    options: [
      {
        id: 'adventure',
        text: 'Phiêu lưu và khám phá những điều mới lạ',
        icon: '🗺️',
        archetypeWeights: {
          protector: 3,
          observer: 2,
          storyteller: 2,
          creator: 3
        }
      },
      {
        id: 'creativity',
        text: 'Sáng tạo và thể hiện nghệ thuật',
        icon: '🎨',
        archetypeWeights: {
          protector: 1,
          observer: 2,
          storyteller: 2,
          creator: 3
        }
      },
      {
        id: 'relaxation',
        text: 'Thư giãn và tìm lại sự cân bằng',
        icon: '🕯️',
        archetypeWeights: {
          protector: 1,
          observer: 3,
          storyteller: 1,
          creator: 2
        }
      },
      {
        id: 'connection',
        text: 'Kết nối với người dân và văn hóa địa phương',
        icon: '🤝',
        archetypeWeights: {
          protector: 2,
          observer: 2,
          storyteller: 3,
          creator: 1
        }
      }
    ]
  },
  {
    id: 'impact_preference',
    question: 'Bạn muốn để lại dấu ấn gì cho Tà Xùa?',
    type: 'single_choice',
    weight: 0.9,
    options: [
      {
        id: 'environmental',
        text: 'Bảo vệ môi trường và thiên nhiên',
        icon: '🌱',
        archetypeWeights: {
          protector: 3,
          observer: 2,
          storyteller: 1,
          creator: 1
        }
      },
      {
        id: 'cultural',
        text: 'Gìn giữ và lan tỏa văn hóa địa phương',
        icon: '🏮',
        archetypeWeights: {
          protector: 1,
          observer: 2,
          storyteller: 3,
          creator: 2
        }
      },
      {
        id: 'artistic',
        text: 'Tạo ra những tác phẩm nghệ thuật đẹp',
        icon: '📸',
        archetypeWeights: {
          protector: 1,
          observer: 2,
          storyteller: 2,
          creator: 3
        }
      },
      {
        id: 'inspirational',
        text: 'Truyền cảm hứng cho người khác',
        icon: '✨',
        archetypeWeights: {
          protector: 2,
          observer: 3,
          storyteller: 3,
          creator: 2
        }
      }
    ]
  }
];

// Sample Journeys for each archetype
export const SAMPLE_JOURNEYS: Journey[] = [
  // Protector Journeys
  {
    id: 'forest-guardian',
    title: 'Hành trình của Người Bảo Vệ Rừng',
    subtitle: 'Trở thành chiến binh xanh bảo vệ thiên nhiên Tà Xùa',
    description: 'Một hành trình đầy ý nghĩa để bạn trực tiếp tham gia bảo vệ và phục hồi hệ sinh thái rừng núi Tà Xùa.',
    storyIntro: 'Trong ánh sáng bình minh đầu tiên chiếu rọi lên những tán lá xanh mướt, bạn bước vào vai trò của một người bảo vệ rừng. Tà Xùa đang chờ đợi đôi tay và trái tim nhiệt huyết của bạn để giữ gìn vẻ đẹp nguyên sơ này cho thế hệ tương lai.',
    storyOutro: 'Khi hoàn thành hành trình, bạn không chỉ để lại dấu ấn xanh trên đất Tà Xùa mà còn mang theo trong tim niềm tự hào của một chiến binh môi trường thực thụ.',
    archetype: 'protector',
    difficulty: 'medium',
    estimatedDuration: 8,
    chapters: [
      {
        id: 'cleanup-trails',
        title: 'Dọn dẹp đường mòn',
        description: 'Làm sạch các tuyến đường mòn trekking phổ biến',
        storyText: 'Những bước chân của hàng ngàn du khách đã để lại dấu vết trên các con đường mòn. Giờ đây, đến lúc bạn trả lại cho thiên nhiên sự trong sạch mà nó xứng đáng có được.',
        guidanceText: 'Hãy mang theo túi rác và găng tay. Tập trung vào việc thu gom rác thải nhựa và kim loại. Hãy nhẹ nhàng với thực vật xung quanh.',
        challengeId: 'green-ambassador-community-1',
        order: 1,
        isCompleted: false
      },
      {
        id: 'plant-trees',
        title: 'Trồng cây phục hồi rừng',
        description: 'Tham gia chương trình trồng cây bản địa',
        storyText: 'Mỗi cây bạn trồng hôm nay sẽ trở thành bóng mát cho những thế hệ mai sau. Đây là món quà vô giá mà bạn dành tặng cho tương lai.',
        guidanceText: 'Chọn những cây bản địa phù hợp với khí hậu. Đào hố sâu vừa đủ và tưới nước đầy đủ. Ghi nhớ vị trí để có thể theo dõi sau này.',
        challengeId: 'sponsor-community-2',
        order: 2,
        isCompleted: false
      },
      {
        id: 'wildlife-protection',
        title: 'Bảo vệ động vật hoang dã',
        description: 'Tìm hiểu và hỗ trợ bảo vệ các loài động vật địa phương',
        storyText: 'Trong tiếng chim hót líu lo và tiếng lá xào xạc, bạn sẽ học cách trở thành người bạn đồng hành của các loài động vật hoang dã.',
        guidanceText: 'Quan sát từ xa, không làm phiền động vật. Ghi chép các loài bạn nhìn thấy và báo cáo những dấu hiệu bất thường.',
        challengeId: 'green-ambassador-solo-1',
        order: 3,
        isCompleted: false
      }
    ],
    rewards: [
      {
        type: 'title',
        value: 'forest-guardian',
        name: 'Người Gác Rừng',
        description: 'Danh hiệu dành cho những ai đã chứng minh tình yêu với thiên nhiên',
        emotionalValue: 'Niềm tự hào của một chiến binh môi trường',
        icon: '🌲',
        rarity: 'epic'
      },
      {
        type: 'badge',
        value: 'eco-warrior',
        name: 'Huy hiệu Chiến binh Xanh',
        description: 'Biểu tượng của sự cam kết bảo vệ môi trường',
        emotionalValue: 'Dấu hiệu của lòng yêu thiên nhiên',
        icon: '🛡️',
        rarity: 'rare'
      },
      {
        type: 'souvenir_card',
        value: 'forest-memory',
        name: 'Thẻ Ký ức Rừng Xanh',
        description: 'Lưu giữ khoảnh khắc bạn trở thành người bảo vệ rừng',
        emotionalValue: 'Kỷ niệm đẹp về ngày bạn làm điều ý nghĩa',
        icon: '🎴',
        rarity: 'common'
      }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800',
    mapImageUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600',
    soundscapeUrl: '/audio/forest-sounds.mp3',
    tags: ['bảo vệ môi trường', 'trồng cây', 'dọn dẹp', 'động vật hoang dã'],
    isUnlocked: true
  },
  
  // Observer Journey
  {
    id: 'mountain-philosopher',
    title: 'Hành trình của Nhà Triết Học Núi Rừng',
    subtitle: 'Khám phá sự yên tĩnh và chiêm nghiệm vẻ đẹp Tà Xùa',
    description: 'Một hành trình nội tâm để bạn tìm thấy sự bình yên và hiểu sâu hơn về thiên nhiên qua những khoảnh khắc chiêm nghiệm.',
    storyIntro: 'Trong sự yên tĩnh của núi rừng, nơi chỉ có tiếng gió thổi qua lá và tiếng chim hót xa xa, bạn sẽ tìm thấy những câu trả lời mà tâm hồn đang tìm kiếm.',
    storyOutro: 'Khi kết thúc hành trình, bạn mang theo không chỉ những hình ảnh đẹp mà còn là sự thấu hiểu sâu sắc về mối liên kết giữa con người và thiên nhiên.',
    archetype: 'observer',
    difficulty: 'easy',
    estimatedDuration: 6,
    chapters: [
      {
        id: 'sunrise-meditation',
        title: 'Thiền định cùng bình minh',
        description: 'Trải nghiệm thiền định trong ánh bình minh đầu tiên',
        storyText: 'Khi những tia nắng đầu tiên xuyên qua màn sương mỏng, bạn ngồi yên lặng và cảm nhận nhịp đập của trái đất dưới chân mình.',
        guidanceText: 'Tìm một vị trí yên tĩnh hướng về phía đông. Ngồi thoải mái và tập trung vào hơi thở. Để tâm trí thư giãn và đón nhận năng lượng của bình minh.',
        challengeId: 'green-ambassador-solo-2',
        order: 1,
        isCompleted: false
      },
      {
        id: 'nature-journaling',
        title: 'Viết nhật ký thiên nhiên',
        description: 'Ghi chép những quan sát và cảm nhận về thiên nhiên',
        storyText: 'Mỗi lá cây, mỗi bông hoa, mỗi con suối đều có câu chuyện riêng. Hãy để bút của bạn ghi lại những câu chuyện ấy.',
        guidanceText: 'Mang theo sổ tay và bút. Quan sát kỹ các chi tiết nhỏ trong thiên nhiên. Viết về màu sắc, âm thanh, mùi hương và cảm xúc của bạn.',
        challengeId: 'local-business-solo-1',
        order: 2,
        isCompleted: false
      },
      {
        id: 'cloud-watching',
        title: 'Ngắm mây và suy tư',
        description: 'Dành thời gian quan sát và suy ngẫm về vẻ đẹp của bầu trời',
        storyText: 'Những đám mây trôi lững lờ như những suy tư của núi rừng. Hãy để tâm hồn bạn cũng nhẹ nhàng như thế.',
        guidanceText: 'Tìm một chỗ nằm thoải mái nhìn lên bầu trời. Quan sát hình dạng và chuyển động của mây. Để tâm trí tự do liên tưởng và suy ngẫm.',
        challengeId: 'green-ambassador-solo-1',
        order: 3,
        isCompleted: false
      }
    ],
    rewards: [
      {
        type: 'title',
        value: 'mountain-sage',
        name: 'Tinh Linh Núi Rừng',
        description: 'Danh hiệu dành cho những tâm hồn đã tìm thấy sự bình yên trong thiên nhiên',
        emotionalValue: 'Sự thấu hiểu sâu sắc về vẻ đẹp thiên nhiên',
        icon: '🧘',
        rarity: 'epic'
      }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
    soundscapeUrl: '/audio/mountain-wind.mp3',
    tags: ['thiền định', 'quan sát', 'viết lách', 'suy ngẫm'],
    isUnlocked: true
  },

  // Storyteller Journey
  {
    id: 'memory-keeper',
    title: 'Hành trình của Người Gìn Giữ Ký Ức',
    subtitle: 'Thu thập và chia sẻ những câu chuyện đẹp của Tà Xùa',
    description: 'Khám phá và ghi lại những câu chuyện, truyền thống và ký ức của người dân địa phương.',
    storyIntro: 'Mỗi người dân nơi đây đều mang trong mình những câu chuyện quý giá. Bạn sẽ trở thành cây cầu nối, giúp những câu chuyện ấy được lan tỏa và lưu giữ.',
    storyOutro: 'Những câu chuyện bạn thu thập không chỉ là ký ức của riêng ai, mà là tài sản chung của cộng đồng và thế hệ tương lai.',
    archetype: 'storyteller',
    difficulty: 'medium',
    estimatedDuration: 10,
    chapters: [
      {
        id: 'elder-interviews',
        title: 'Phỏng vấn người già trong làng',
        description: 'Lắng nghe và ghi lại những câu chuyện từ thế hệ đi trước',
        storyText: 'Trong ánh mắt của những người già, bạn sẽ thấy cả một lịch sử sống động của vùng đất này.',
        guidanceText: 'Hãy lịch sự và tôn trọng. Chuẩn bị những câu hỏi mở. Lắng nghe nhiều hơn nói. Xin phép trước khi ghi âm.',
        challengeId: 'local-business-community-1',
        order: 1,
        isCompleted: false
      },
      {
        id: 'cultural-documentation',
        title: 'Ghi chép văn hóa truyền thống',
        description: 'Tìm hiểu và lưu giữ các nét văn hóa độc đáo',
        storyText: 'Từng điệu múa, từng bài hát, từng món ăn đều chứa đựng linh hồn của dân tộc. Hãy giúp những giá trị này được bảo tồn.',
        guidanceText: 'Tham gia các hoạt động văn hóa. Học cách làm thủ công truyền thống. Ghi chép chi tiết về ý nghĩa và cách thực hiện.',
        challengeId: 'sponsor-community-1',
        order: 2,
        isCompleted: false
      },
      {
        id: 'story-sharing',
        title: 'Chia sẻ câu chuyện',
        description: 'Kể lại những câu chuyện đã thu thập cho cộng đồng',
        storyText: 'Giờ đây, bạn trở thành người kể chuyện, mang những ký ức quý giá đến với nhiều người hơn.',
        guidanceText: 'Tổ chức buổi chia sẻ nhỏ. Sử dụng hình ảnh và âm thanh để minh họa. Khuyến khích mọi người cùng chia sẻ câu chuyện của họ.',
        challengeId: 'local-business-community-2',
        order: 3,
        isCompleted: false
      }
    ],
    rewards: [
      {
        type: 'title',
        value: 'memory-keeper',
        name: 'Người Gìn Giữ Ký Ức',
        description: 'Danh hiệu dành cho những ai đã góp phần bảo tồn văn hóa địa phương',
        emotionalValue: 'Niềm tự hào về việc lưu giữ di sản văn hóa',
        icon: '📚',
        rarity: 'legendary'
      }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?w=800',
    soundscapeUrl: '/audio/village-sounds.mp3',
    tags: ['văn hóa', 'phỏng vấn', 'chia sẻ', 'truyền thống'],
    isUnlocked: true
  },

  // Creator Journey
  {
    id: 'nature-artist',
    title: 'Hành trình của Nghệ Sĩ Thiên Nhiên',
    subtitle: 'Tạo ra những tác phẩm nghệ thuật từ vẻ đẹp Tà Xùa',
    description: 'Sử dụng con mắt nghệ thuật để ghi lại và tái hiện vẻ đẹp của thiên nhiên qua các tác phẩm sáng tạo.',
    storyIntro: 'Với đôi mắt của một nghệ sĩ, bạn sẽ nhìn thấy Tà Xùa dưới những góc độ mà không phải ai cũng có thể cảm nhận được.',
    storyOutro: 'Những tác phẩm bạn tạo ra không chỉ là nghệ thuật mà còn là lời chứng cho vẻ đẹp vĩnh cửu của thiên nhiên.',
    archetype: 'creator',
    difficulty: 'hard',
    estimatedDuration: 12,
    chapters: [
      {
        id: 'golden-hour-photography',
        title: 'Nhiếp ảnh giờ vàng',
        description: 'Chụp ảnh trong những khoảnh khắc ánh sáng đẹp nhất',
        storyText: 'Khi ánh sáng mềm mại của bình minh và hoàng hôn hôn lên từng ngọn cỏ, đó là lúc thiên nhiên trở nên kỳ diệu nhất.',
        guidanceText: 'Chuẩn bị máy ảnh từ sớm. Tìm hiểu về quy tắc 1/3. Chú ý đến ánh sáng và bóng đổ. Chụp ở định dạng RAW để có thể chỉnh sửa sau.',
        challengeId: 'green-ambassador-solo-2',
        order: 1,
        isCompleted: false
      },
      {
        id: 'creative-composition',
        title: 'Sáng tác nghệ thuật',
        description: 'Tạo ra tác phẩm nghệ thuật từ chính trải nghiệm của bạn',
        storyText: 'Hãy để cảm xúc và trải nghiệm của bạn thể hiện qua từng nét vẽ, từng khung hình, từng âm thanh.',
        guidanceText: 'Thử nghiệm với nhiều phương tiện khác nhau: vẽ, chụp ảnh, quay video, ghi âm. Đừng ngại thể hiện cảm xúc cá nhân.',
        challengeId: 'sponsor-solo-1',
        order: 2,
        isCompleted: false
      },
      {
        id: 'art-exhibition',
        title: 'Triển lãm tác phẩm',
        description: 'Chia sẻ tác phẩm với cộng đồng',
        storyText: 'Nghệ thuật chỉ thực sự có ý nghĩa khi được chia sẻ. Hãy để tác phẩm của bạn truyền cảm hứng cho người khác.',
        guidanceText: 'Tổ chức triển lãm nhỏ hoặc chia sẻ online. Viết mô tả về cảm hứng và quá trình sáng tác. Lắng nghe phản hồi từ mọi người.',
        challengeId: 'local-business-solo-2',
        order: 3,
        isCompleted: false
      }
    ],
    rewards: [
      {
        type: 'title',
        value: 'nature-artist',
        name: 'Nghệ Sĩ Thiên Nhiên',
        description: 'Danh hiệu dành cho những ai đã tạo ra nghệ thuật từ vẻ đẹp thiên nhiên',
        emotionalValue: 'Niềm tự hào của một nghệ sĩ chân chính',
        icon: '🎨',
        rarity: 'epic'
      }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800',
    soundscapeUrl: '/audio/creative-ambience.mp3',
    tags: ['nhiếp ảnh', 'sáng tạo', 'nghệ thuật', 'triển lãm'],
    isUnlocked: true
  }
];

// Mini Quests for static challenges
export const MINI_QUESTS: MiniQuest[] = [
  {
    id: 'ecosystem-video',
    title: 'Khám phá Hệ sinh thái Tà Xùa',
    description: 'Xem video giới thiệu về đa dạng sinh học của vùng núi Tà Xùa',
    type: 'video',
    content: {
      videoUrl: 'https://www.youtube.com/watch?v=example-ecosystem'
    },
    points: 50,
    estimatedTime: 15,
    isCompleted: false
  },
  {
    id: 'hmong-culture-podcast',
    title: 'Nghe Podcast Văn hóa H\'Mông',
    description: 'Tìm hiểu về truyền thống và lối sống của người H\'Mông qua podcast',
    type: 'podcast',
    content: {
      podcastUrl: 'https://example.com/hmong-culture-podcast'
    },
    points: 75,
    estimatedTime: 30,
    isCompleted: false
  },
  {
    id: 'nature-reflection',
    title: 'Suy ngẫm về Thiên nhiên',
    description: 'Viết một đoạn cảm nhận ngắn về mối quan hệ giữa con người và thiên nhiên',
    type: 'reflection',
    content: {
      reflectionPrompt: 'Hãy chia sẻ suy nghĩ của bạn về việc làm thế nào để con người có thể sống hài hòa với thiên nhiên. Bạn có thể bắt đầu từ những trải nghiệm cá nhân hoặc những gì bạn quan sát được ở Tà Xùa.'
    },
    points: 100,
    estimatedTime: 20,
    isCompleted: false
  },
  {
    id: 'sustainability-quiz',
    title: 'Kiểm tra Kiến thức Du lịch Bền vững',
    description: 'Trả lời câu hỏi về du lịch có trách nhiệm với môi trường',
    type: 'quiz',
    content: {
      quizQuestions: [
        {
          id: 'q1',
          question: 'Nguyên tắc nào sau đây KHÔNG phải là nguyên tắc của du lịch bền vững?',
          options: [
            'Giảm thiểu tác động tiêu cực đến môi trường',
            'Tôn trọng văn hóa địa phương',
            'Tối đa hóa lợi nhuận từ du lịch',
            'Mang lại lợi ích cho cộng đồng địa phương'
          ],
          correctAnswer: 2,
          explanation: 'Du lịch bền vững tập trung vào việc cân bằng giữa lợi ích kinh tế, xã hội và môi trường, không chỉ tối đa hóa lợi nhuận.'
        },
        {
          id: 'q2',
          question: 'Khi tham quan thiên nhiên, bạn nên làm gì?',
          options: [
            'Chỉ chụp ảnh, không lấy gì',
            'Thu thập mẫu vật làm kỷ niệm',
            'Cho động vật ăn để chụp ảnh đẹp',
            'Khắc tên mình lên cây để đánh dấu'
          ],
          correctAnswer: 0,
          explanation: 'Nguyên tắc "Take only pictures, leave only footprints" giúp bảo vệ thiên nhiên cho thế hệ tương lai.'
        }
      ]
    },
    points: 150,
    estimatedTime: 10,
    isCompleted: false
  },
  {
    id: 'virtual-village-tour',
    title: 'Tour Ảo Làng Bản H\'Mông',
    description: 'Khám phá làng bản truyền thống qua tour ảo 360 độ',
    type: 'virtual_tour',
    content: {
      virtualTourUrl: 'https://example.com/hmong-village-360-tour'
    },
    points: 80,
    estimatedTime: 25,
    isCompleted: false
  }
];

// Mapping existing challenges to narrative journeys
export const CHALLENGE_TO_JOURNEY_MAPPING = {
  // Protector archetype journeys
  'protector': [
    'green-ambassador-community-1', // Dọn dẹp đường mòn cộng đồng
    'sponsor-community-2', // Chương trình Trồng rừng Cùng Viettel
    'local-business-community-1', // Lễ hội Hoa Ban
    'local-business-community-2', // Chợ phiên Tà Xùa
  ],
  
  // Observer archetype journeys
  'observer': [
    'green-ambassador-solo-2', // Nhiếp ảnh bình minh chuyên nghiệp
    'local-business-solo-1', // Khám phá làng bản với Homestay Mây Trắng
    'sponsor-solo-1', // Trải nghiệm Homestay Cao Cấp VinEco
    'local-business-solo-2', // Thu hoạch nông sản
  ],
  
  // Storyteller archetype journeys
  'storyteller': [
    'sponsor-community-1', // Lớp học nấu ăn H'Mông
    'green-ambassador-community-2', // Workshop Du lịch Bền vững
    'local-business-solo-1', // Khám phá làng bản
    'local-business-community-1', // Lễ hội Hoa Ban
  ],
  
  // Creator archetype journeys
  'creator': [
    'green-ambassador-solo-1', // Chinh phục đỉnh Tà Xùa
    'green-ambassador-solo-2', // Nhiếp ảnh bình minh chuyên nghiệp
    'sponsor-solo-1', // Trải nghiệm Homestay Cao Cấp
    'local-business-solo-2', // Thu hoạch nông sản
  ]
};

// Enhanced storytelling elements for existing challenges
export const STORYTELLING_ENHANCEMENTS = {
  'green-ambassador-solo-1': {
    storyIntro: 'Trong ánh sáng bình minh đầu tiên, bạn đứng trước thử thách chinh phục đỉnh cao nhất của Tà Xùa. Đây không chỉ là hành trình leo núi, mà là cuộc hành trình khám phá chính mình.',
    guidanceText: 'Hãy tìm những góc nhìn độc đáo từ đỉnh cao, và ghi lại chúng bằng ống kính của bạn. Mỗi bức ảnh panorama không chỉ là hình ảnh, mà là câu chuyện về sự kiên trì và đam mê.',
    completionText: 'Bạn đã chinh phục không chỉ đỉnh núi, mà còn chinh phục được chính mình. Từ độ cao này, bạn nhìn thấy Tà Xùa trong toàn bộ vẻ đẹp hùng vĩ của nó.',
    emotionalReward: 'Niềm tự hào của một người chinh phục đỉnh cao'
  },
  
  'green-ambassador-solo-2': {
    storyIntro: 'Khi bóng đêm dần nhường chỗ cho ánh sáng đầu tiên của ngày mới, bạn chuẩn bị ghi lại khoảnh khắc kỳ diệu mà thiên nhiên chỉ tặng cho những ai biết thức dậy sớm.',
    guidanceText: 'Hãy tìm những khoảnh khắc nơi ánh sáng chạm vào đỉnh núi, tạo nên những bức tranh thiên nhiên tuyệt đẹp. Sử dụng kỹ thuật nhiếp ảnh để tôn vinh vẻ đẹp này.',
    completionText: 'Những bức ảnh bạn vừa chụp không chỉ ghi lại ánh sáng, mà còn ghi lại cảm xúc của một tâm hồn yêu thiên nhiên.',
    emotionalReward: 'Sự thấu hiểu sâu sắc về vẻ đẹp của bình minh'
  },

  'green-ambassador-community-1': {
    storyIntro: 'Những con đường mòn này đã chứng kiến bao bước chân của du khách. Giờ đây, đến lút bạn trả lại cho chúng sự trong sạch mà chúng xứng đáng có được.',
    guidanceText: 'Hãy nhặt từng mảnh rác với tình yêu thương, như thể bạn đang chăm sóc ngôi nhà của chính mình. Mỗi hành động nhỏ đều góp phần tạo nên sự thay đổi lớn.',
    completionText: 'Con đường giờ đây sạch sẽ hơn, và rừng đã cảm nhận được tình yêu của bạn. Bạn đã trở thành một phần của giải pháp.',
    emotionalReward: 'Niềm vui của việc làm điều đúng đắn'
  },

  'sponsor-community-2': {
    storyIntro: 'Mỗi cây bạn trồng hôm nay sẽ trở thành bóng mát cho những thế hệ mai sau. Công nghệ sẽ giúp bạn theo dõi sự phát triển của chúng, tạo nên mối liên kết đặc biệt.',
    guidanceText: 'Hãy gieo những hạt giống hy vọng cho tương lai xanh của Tà Xùa. Mỗi cây được trồng đều mang theo lời hứa về một tương lai bền vững.',
    completionText: 'Những cây non đã được trồng, và bạn đã trở thành một phần của tương lai xanh. Công nghệ sẽ giúp bạn theo dõi sự lớn lên của chúng.',
    emotionalReward: 'Hy vọng về một tương lai xanh tươi'
  },

  'local-business-solo-1': {
    storyIntro: 'Mỗi nụ cười của người dân, mỗi động tác thêu thùa, đều là những câu chuyện sống động về một nền văn hóa đã tồn tại hàng trăm năm.',
    guidanceText: 'Hãy hòa mình vào cuộc sống của người dân địa phương, quan sát và học hỏi từ những truyền thống lâu đời. Mỗi tương tác đều là một bài học quý giá.',
    completionText: 'Bạn đã không chỉ quan sát mà còn trở thành một phần của cộng đồng, dù chỉ trong thời gian ngắn. Những kỷ niệm này sẽ mãi trong tim bạn.',
    emotionalReward: 'Sự kết nối sâu sắc với văn hóa địa phương'
  },

  'sponsor-community-1': {
    storyIntro: 'Bên bếp lửa ấm áp, những câu chuyện đưểc kể qua từng món ăn. Bạn sẽ học không chỉ cách nấu ăn ăn, mà còn hiểu được linh hồn của ẩm thực địa phương.',
    guidanceText: 'Hãy lắng nghe những câu chuyện đưểc kểc bên bếp lửa, và học cách nấu những món ăn chứa đựng linh hồn của núi rừng.',
    completionText: 'Bạn đã không chỉ học được cách nấu ăn, mà còn hiểu được câu chuyện đằng sau mỗi món ăn. Đây là món quà văn hóa quý giá.',
    emotionalReward: 'Sự thấu hiểu về ẩm thực và văn hóa'
  }
};

// Emotional diary entries system
export const DIARY_ENTRY_TEMPLATES = {
  'completion': [
    'Hôm nay, bạn đã dành {duration} phút {activity}. {location} và {feeling} trở thành dấu ấn đầu tiên trong hành trình của bạn.',
    'Trong {timeOfDay}, bạn đã {action}. Cảm giác {emotion} và {atmosphere} sẽ mãi là kỷ niệm đẹp về Tà Xùa.',
    'Bạn vừa hoàn thành {challenge}. {weather} và {mood} tạo nên một trải nghiệm không thể quên.',
  ],
  'reflection': [
    'Khi nhìn lại hành trình, bạn cảm thấy {feeling} về những gì mình đã làm. {insight} là điều bạn học được từ trải nghiệm này.',
    'Tà Xùa đã dạy bạn rằng {lesson}. {memory} sẽ là điều bạn mang theo khi rời khỏi nơi đây.',
  ],
  'accomplished': [
    'Cảm giác hoàn thành {task} thật tuyệt vời! {achievement} đã mang lại cho bạn niềm vui và sự hài lòng.',
    'Bạn đã vượt qua thử thách {challenge} một cách xuất sắc. {reward} chính là phần thưởng xứng đáng cho nỗ lực của bạn.',
    'Thành công hoàn thành {activity} khiến bạn cảm thấy {emotion}. Đây sẽ là kỷ niệm đáng nhớ về Tà Xùa.',
  ]
};

// Background music mapping for different journey types
export const SOUNDSCAPE_MAPPING = {
  'protector': '/audio/forest-protection.mp3',
  'observer': '/audio/mountain-meditation.mp3', 
  'storyteller': '/audio/village-stories.mp3',
  'creator': '/audio/creative-inspiration.mp3',
  'default': '/audio/taxua-ambient.mp3'
};

// Reward enhancement with emotional values
export const ENHANCED_REWARDS = {
  titles: {
    'forest-guardian': {
      name: 'Người Gác Rừng',
      description: 'Danh hiệu danh giá dành cho những ai đã chứng minh tình yêu với thiên nhiên',
      emotionalValue: 'Niềm tự hào của một chiến binh môi trường',
      icon: '🌲',
      rarity: 'epic',
      unlockMessage: 'Chúc mừng! Bạn đã trở thành Người Gác Rừng của Tà Xùa.'
    },
    'cloud-hunter': {
      name: 'Kẻ Săn Hoàng Hôn', 
      description: 'Danh hiệu dành cho những người biết tìm kiếm và ghi lại vẻ đẹp',
      emotionalValue: 'Sự kiên nhẫn và tình yêu với vẻ đẹp tự nhiên',
      icon: '🌅',
      rarity: 'rare',
      unlockMessage: 'Tuyệt vời! Bạn đã trở thành Kẻ Săn Hoàng Hôn.'
    },
    'mountain-storyteller': {
      name: 'Người Kể Núi',
      description: 'Danh hiệu dành cho những người gìn giữ và truyền bá câu chuyện',
      emotionalValue: 'Trách nhiệm gìn giữ văn hóa và truyền thống',
      icon: '📚',
      rarity: 'rare',
      unlockMessage: 'Xuất sắc! Bạn đã trở thành Người Kể Núi.'
    },
    'peak-artist': {
      name: 'Nghệ Sĩ Đỉnh Cao',
      description: 'Danh hiệu cao quý dành cho những nghệ sĩ tài năng',
      emotionalValue: 'Niềm tự hào của một nghệ sĩ chân chính',
      icon: '🎨',
      rarity: 'legendary',
      unlockMessage: 'Tuyệt tác! Bạn đã trở thành Nghệ Sĩ Đỉnh Cao.'
    }
  },
  
  souvenirCards: {
    'forest-memory': {
      title: 'Thẻ Ký ức Rừng Xanh',
      story: 'Trong những ngày tại Tà Xùa, bạn đã chứng minh rằng tình yêu thiên nhiên không chỉ là lời nói, mà là hành động. Mỗi cây đường được làm sạch, đều là dấu ấn của một trái tim yêu rừng.',
      imageUrl: '/images/souvenirs/forest-memory.jpg',
      rarity: 'common'
    },
    'sunrise-moment': {
      title: 'Thẻ Khoảnh Khắc Bình Minh',
      story: 'Qua ống kính của bạn, Tà Xùa đã trở nên sống động hơn bao giờ hết. Mỗi bức ảnh không chỉ là hình ảnh, mà là câu chuyện về vẻ đẹp mà bạn đã khám phá.',
      imageUrl: '/images/souvenirs/sunrise-moment.jpg',
      rarity: 'rare'
    },
    'cultural-bridge': {
      title: 'Thẻ Cầu Nối Văn Hóa',
      story: 'Bạn đã trở thành người gìn giữ những câu chuyện của Tà Xùa. Mỗi câu chuyện bạn kể lại đều mang trong mình một phần linh hồn của núi rừng này.',
      imageUrl: '/images/souvenirs/cultural-bridge.jpg',
      rarity: 'epic'
    },
    'artistic-vision': {
      title: 'Thẻ Tầm Nhìn Nghệ Thuật',
      story: 'Tà Xùa đã trở thành nguồn cảm hứng bất tận cho những tác phẩm nghệ thuật của bạn. Mỗi tác phẩm đều mang trong mình một phần linh hồn của núi rừng này.',
      imageUrl: '/images/souvenirs/artistic-vision.jpg',
      rarity: 'legendary'
    }
  }
};