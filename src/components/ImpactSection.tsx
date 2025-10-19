import { useState, useEffect } from 'react';
import { Leaf, Users, TreePine, Recycle } from 'lucide-react';

interface ImpactData {
  treesPlanted: number;
  wasteCollected: number;
  communityMembers: number;
  carbonOffset: number;
}

const ImpactSection = () => {
  const [impactData, setImpactData] = useState<ImpactData>({
    treesPlanted: 0,
    wasteCollected: 0,
    communityMembers: 0,
    carbonOffset: 0
  });

  // Simulate real data from API
  useEffect(() => {
    const fetchImpactData = async () => {
      // This would be replaced with actual API call
      const data = {
        treesPlanted: 1247,
        wasteCollected: 3.2, // in tons
        communityMembers: 892,
        carbonOffset: 15.6 // in tons CO2
      };
      
      // Animate numbers counting up
      const animateNumber = (target: number, setter: (value: number) => void, duration: number = 2000) => {
        let start = 0;
        const increment = target / (duration / 16);
        const timer = setInterval(() => {
          start += increment;
          if (start >= target) {
            setter(target);
            clearInterval(timer);
          } else {
            setter(Math.floor(start));
          }
        }, 16);
      };

      setTimeout(() => {
        animateNumber(data.treesPlanted, (value) => 
          setImpactData(prev => ({ ...prev, treesPlanted: value }))
        );
        animateNumber(data.wasteCollected * 10, (value) => 
          setImpactData(prev => ({ ...prev, wasteCollected: value / 10 }))
        );
        animateNumber(data.communityMembers, (value) => 
          setImpactData(prev => ({ ...prev, communityMembers: value }))
        );
        animateNumber(data.carbonOffset * 10, (value) => 
          setImpactData(prev => ({ ...prev, carbonOffset: value / 10 }))
        );
      }, 500);
    };

    fetchImpactData();
  }, []);

  const impactItems = [
    {
      icon: TreePine,
      value: impactData.treesPlanted,
      label: 'Cây được trồng',
      suffix: '',
      color: 'text-green-400'
    },
    {
      icon: Recycle,
      value: impactData.wasteCollected,
      label: 'Tấn rác thu gom',
      suffix: '',
      color: 'text-blue-400'
    },
    {
      icon: Users,
      value: impactData.communityMembers,
      label: 'Thành viên cộng đồng',
      suffix: '',
      color: 'text-purple-400'
    },
    {
      icon: Leaf,
      value: impactData.carbonOffset,
      label: 'Tấn CO₂ giảm thiểu',
      suffix: '',
      color: 'text-orange-400'
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Tác động thật
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Những con số này phản ánh tác động tích cực mà cộng đồng ViViet đã tạo ra tại Tà Xùa
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {impactItems.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <div key={index} className="text-center">
                <div className="mb-4 flex justify-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center shadow-sm">
                    <IconComponent className={`w-8 h-8 ${item.color}`} />
                  </div>
                </div>
                <div className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
                  {typeof item.value === 'number' && item.value % 1 !== 0 
                    ? item.value.toFixed(1) 
                    : Math.floor(item.value).toLocaleString()
                  }
                  {item.suffix}
                </div>
                <div className="text-sm text-gray-600">
                  {item.label}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-gray-500">
            Dữ liệu được cập nhật thời gian thực từ các hoạt động Sky Quest và đối tác địa phương
          </p>
        </div>
      </div>
    </section>
  );
};

export default ImpactSection;