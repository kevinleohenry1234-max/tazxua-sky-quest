import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ShoppingBag, 
  ExternalLink, 
  MapPin, 
  Phone, 
  Star,
  X
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const ShoppingAssistant = () => {
  const [selectedItem, setSelectedItem] = useState<any>(null);

  const preparationItems = [
    {
      id: 1,
      name: 'Giày Trekking Chống Trượt',
      image: '/api/placeholder/200/150',
      description: 'Giày cao cổ chống nước, đế chống trượt',
      priceRange: '800.000 - 2.500.000 VNĐ',
      recommendations: [
        {
          brand: 'Decathlon Quechua',
          model: 'MH100 Mid',
          price: '899.000 VNĐ',
          rating: 4.5,
          features: ['Chống nước', 'Đế chống trượt', 'Thoáng khí']
        },
        {
          brand: 'Bitis Hunter',
          model: 'Forest Green',
          price: '1.200.000 VNĐ',
          rating: 4.3,
          features: ['Made in Vietnam', 'Cao su tự nhiên', 'Thiết kế ergonomic']
        }
      ],
      stores: [
        {
          name: 'Decathlon Việt Nam',
          type: 'Cửa hàng & Online',
          address: 'Nhiều chi nhánh toàn quốc',
          phone: '1900 2086',
          website: 'decathlon.vn',
          shopee: 'shopee.vn/decathlonvietnam',
          lazada: 'lazada.vn/decathlon'
        },
        {
          name: 'Bitis',
          type: 'Cửa hàng & Online',
          address: 'Hệ thống cửa hàng toàn quốc',
          phone: '1800 2086',
          website: 'bitis.com.vn',
          shopee: 'shopee.vn/bitis.official',
          lazada: 'lazada.vn/bitis-official'
        }
      ]
    },
    {
      id: 2,
      name: 'Áo Ấm (Nhiệt độ dưới 10°C)',
      image: '/api/placeholder/200/150',
      description: 'Áo jacket, áo phao hoặc áo len dày',
      priceRange: '300.000 - 1.500.000 VNĐ',
      recommendations: [
        {
          brand: 'Uniqlo',
          model: 'Ultra Light Down Jacket',
          price: '990.000 VNĐ',
          rating: 4.7,
          features: ['Siêu nhẹ', 'Chống gió', 'Có thể gấp gọn']
        },
        {
          brand: 'The North Face',
          model: 'Venture 2 Jacket',
          price: '1.400.000 VNĐ',
          rating: 4.8,
          features: ['Chống nước hoàn toàn', 'Thoáng khí', 'Bền bỉ']
        }
      ],
      stores: [
        {
          name: 'Uniqlo Vietnam',
          type: 'Cửa hàng & Online',
          address: 'TTTM lớn tại HN, HCM, Đà Nẵng',
          phone: '1800 6090',
          website: 'uniqlo.com.vn',
          shopee: 'shopee.vn/uniqlo_vietnam',
          lazada: 'lazada.vn/uniqlo-vietnam'
        },
        {
          name: 'Authentic Store',
          type: 'Đại lý chính hãng',
          address: 'Các trung tâm thương mại',
          phone: '028 3827 8888',
          website: 'authenticstore.vn',
          shopee: 'shopee.vn/authentic.store.vn',
          lazada: 'lazada.vn/authentic-store'
        }
      ]
    },
    {
      id: 3,
      name: 'Đèn Pin & Pin Dự Phòng',
      image: '/api/placeholder/200/150',
      description: 'Đèn pin LED sáng, pin sạc dự phòng',
      priceRange: '150.000 - 800.000 VNĐ',
      recommendations: [
        {
          brand: 'Xiaomi',
          model: 'Mi Portable Flashlight',
          price: '190.000 VNĐ',
          rating: 4.4,
          features: ['Sạc USB-C', '3 chế độ sáng', 'Nhẹ nhàng']
        },
        {
          brand: 'Anker',
          model: 'PowerCore 10000mAh',
          price: '650.000 VNĐ',
          rating: 4.9,
          features: ['Sạc nhanh', 'Nhỏ gọn', 'An toàn tuyệt đối']
        }
      ],
      stores: [
        {
          name: 'Mi Store Vietnam',
          type: 'Cửa hàng chính hãng',
          address: 'Mi Store và ủy quyền toàn quốc',
          phone: '1800 1065',
          website: 'mi.com.vn',
          shopee: 'shopee.vn/xiaomi.vietnam',
          lazada: 'lazada.vn/mi-store-vietnam'
        },
        {
          name: 'FPT Shop',
          type: 'Chuỗi bán lẻ công nghệ',
          address: 'Hệ thống cửa hàng toàn quốc',
          phone: '1800 6601',
          website: 'fptshop.com.vn',
          shopee: 'shopee.vn/fptshop',
          lazada: 'lazada.vn/fpt-shop'
        }
      ]
    },
    {
      id: 4,
      name: 'Nước Uống & Thức Ăn Nhẹ',
      image: '/api/placeholder/200/150',
      description: 'Nước ion, bánh protein, hạt dinh dư양',
      priceRange: '50.000 - 300.000 VNĐ',
      recommendations: [
        {
          brand: 'Aquafina/La Vie',
          model: 'Nước khoáng 1.5L',
          price: '8.000 - 12.000 VNĐ',
          rating: 4.2,
          features: ['Tiện dụng', 'An toàn', 'Dễ mang theo']
        },
        {
          brand: 'Quest/Optimum',
          model: 'Protein Bar',
          price: '45.000 - 65.000 VNĐ/thanh',
          rating: 4.6,
          features: ['Giàu protein', 'Năng lượng cao', 'Hương vị ngon']
        }
      ],
      stores: [
        {
          name: 'Circle K',
          type: 'Cửa hàng tiện lợi',
          address: 'Khắp nơi trong thành phố',
          phone: '1800 6772',
          website: 'circlek.com.vn',
          shopee: 'shopee.vn/circlekvietnam',
          lazada: null
        },
        {
          name: 'Vinmart/WinMart',
          type: 'Siêu thị',
          address: 'Hệ thống siêu thị toàn quốc',
          phone: '1800 6828',
          website: 'winmart.vn',
          shopee: 'shopee.vn/winmart',
          lazada: 'lazada.vn/winmart'
        }
      ]
    },
    {
      id: 5,
      name: 'Thuốc Men Cá Nhân',
      image: '/api/placeholder/200/150',
      description: 'Thuốc cảm cúm, dán salonpas, thuốc dạ dày',
      priceRange: '100.000 - 500.000 VNĐ',
      recommendations: [
        {
          brand: 'Panadol Extra',
          model: 'Viên giảm đau, hạ sốt',
          price: '45.000 VNĐ/hộp',
          rating: 4.5,
          features: ['Hiệu quả nhanh', 'An toàn', 'Dễ sử dụng']
        },
        {
          brand: 'Salonpas',
          model: 'Miếng dán giảm đau',
          price: '65.000 VNĐ/hộp',
          rating: 4.3,
          features: ['Giảm đau cơ', 'Dễ dán', 'Tác dụng lâu dài']
        }
      ],
      stores: [
        {
          name: 'Pharmacity',
          type: 'Chuỗi nhà thuốc',
          address: 'Hệ thống nhà thuốc toàn quốc',
          phone: '1800 6821',
          website: 'pharmacity.vn',
          shopee: 'shopee.vn/pharmacity',
          lazada: 'lazada.vn/pharmacity'
        },
        {
          name: 'Long Châu',
          type: 'Chuỗi nhà thuốc FPT',
          address: 'Nhiều chi nhánh tại các thành phố',
          phone: '1800 6928',
          website: 'nhathuoclongchau.com',
          shopee: 'shopee.vn/longchaupharmacy',
          lazada: 'lazada.vn/nha-thuoc-long-chau'
        }
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h3 className="font-playfair text-2xl md:text-3xl font-bold text-foreground mb-4">
          Trợ Lý Mua Sắm Thông Minh
        </h3>
        <p className="font-inter text-muted-foreground">
          Tìm và mua sắm các vật phẩm cần thiết cho chuyến đi
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {preparationItems.map((item) => (
          <Card key={item.id} className="hover:shadow-medium transition-shadow">
            <div className="aspect-video bg-muted/30 rounded-t-lg flex items-center justify-center">
              <ShoppingBag className="w-12 h-12 text-muted-foreground" />
            </div>
            
            <CardHeader>
              <CardTitle className="font-playfair text-lg">{item.name}</CardTitle>
              <p className="text-sm text-muted-foreground">{item.description}</p>
              <Badge variant="outline" className="w-fit">
                {item.priceRange}
              </Badge>
            </CardHeader>
            
            <CardContent>
              <Dialog>
                <DialogTrigger asChild>
                  <Button 
                    className="w-full"
                    onClick={() => setSelectedItem(item)}
                  >
                    Tìm Nơi Mua
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="flex items-center space-x-2">
                      <ShoppingBag className="w-5 h-5" />
                      <span>{selectedItem?.name}</span>
                    </DialogTitle>
                  </DialogHeader>
                  
                  {selectedItem && (
                    <div className="space-y-6">
                      {/* Recommendations */}
                      <div>
                        <h4 className="font-semibold mb-3">Sản Phẩm Gợi Ý</h4>
                        <div className="space-y-3">
                          {selectedItem.recommendations.map((rec: any, index: number) => (
                            <div key={index} className="p-4 border border-border rounded-lg">
                              <div className="flex justify-between items-start mb-2">
                                <div>
                                  <h5 className="font-semibold">{rec.brand}</h5>
                                  <p className="text-sm text-muted-foreground">{rec.model}</p>
                                </div>
                                <div className="text-right">
                                  <div className="font-semibold text-primary">{rec.price}</div>
                                  <div className="flex items-center space-x-1 text-sm">
                                    <Star className="w-3 h-3 text-yellow-400 fill-current" />
                                    <span>{rec.rating}</span>
                                  </div>
                                </div>
                              </div>
                              <div className="flex flex-wrap gap-1">
                                {rec.features.map((feature: string, idx: number) => (
                                  <Badge key={idx} variant="secondary" className="text-xs">
                                    {feature}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Stores */}
                      <div>
                        <h4 className="font-semibold mb-3">Nơi Mua Uy Tín</h4>
                        <div className="space-y-4">
                          {selectedItem.stores.map((store: any, index: number) => (
                            <div key={index} className="p-4 border border-border rounded-lg">
                              <div className="flex justify-between items-start mb-3">
                                <div>
                                  <h5 className="font-semibold">{store.name}</h5>
                                  <Badge variant="outline" className="text-xs">
                                    {store.type}
                                  </Badge>
                                </div>
                              </div>
                              
                              <div className="space-y-2 text-sm">
                                <div className="flex items-center space-x-2">
                                  <MapPin className="w-4 h-4 text-muted-foreground" />
                                  <span>{store.address}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <Phone className="w-4 h-4 text-muted-foreground" />
                                  <span>{store.phone}</span>
                                </div>
                              </div>
                              
                              <div className="flex flex-wrap gap-2 mt-3">
                                {store.website && (
                                  <Button size="sm" variant="outline" asChild>
                                    <a href={`https://${store.website}`} target="_blank" rel="noopener noreferrer">
                                      <ExternalLink className="w-3 h-3 mr-1" />
                                      Website
                                    </a>
                                  </Button>
                                )}
                                {store.shopee && (
                                  <Button size="sm" variant="outline" asChild>
                                    <a href={`https://${store.shopee}`} target="_blank" rel="noopener noreferrer">
                                      <ExternalLink className="w-3 h-3 mr-1" />
                                      Shopee
                                    </a>
                                  </Button>
                                )}
                                {store.lazada && (
                                  <Button size="sm" variant="outline" asChild>
                                    <a href={`https://${store.lazada}`} target="_blank" rel="noopener noreferrer">
                                      <ExternalLink className="w-3 h-3 mr-1" />
                                      Lazada
                                    </a>
                                  </Button>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ShoppingAssistant;