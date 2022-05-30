import { INavData } from '@coreui/angular';
export const navItems: INavData[] = [
  {
    name:"THỐNG KÊ",
    children:
    [
      {
        name: 'Tổng quan',
        url: '/admin/dashboard',
        icon: 'cil-chart-line',
      },
      {
        name: 'Bán hàng',
        url: '/admin/chartsecond',
        icon: 'cil-chart-pie',
      },
      {
        name: 'Nhập hàng',
        url: '/admin/chartthird',
        icon: 'cil-bar-chart',
      },
    ]
  },
  {
    name:"QUẢN LÝ",
    children:
    [
      {
        name: 'Sản phẩm',
        url: '/admin/products',
        icon: 'cil-3d',
      },
      {
        name: 'Loại',
        url: '/admin/categories',
        icon: 'cil-aperture',
      },
      {
        name: 'Nhà cung cấp',
        url: '/admin/nhacungcaps',
        icon: 'cil-library-building',
      },
      {
        name: 'Nhãn hiệu',
        url: '/admin/brands',
        icon: 'cil-apps',
      },
      {
        name: 'Size',
        url: '/admin/sizes',
        icon: 'cil-resize-width',
      },
      {
        name: 'Màu sắc',
        url: '/admin/mausacs',
        icon: 'cil-burn',
      },
      {
        name: 'Sản phẩm biến thể',
        url: '/admin/sanphambienthes',
        icon:'cil-dialpad'
      },
      {
        name:'Người dùng',
        url:'/admin/aspnetusers',
        icon:'cil-address-book'
      },
      {
        name: 'Mã giảm giá',
        url: '/admin/magiamgias',
        icon: 'cil-puzzle',
      },
      {
        name:'Blog',
        url:'admin/blogs',
        icon:'cil-chat-bubble'
      },
      {
        name:'Trò chuyện',
        url:'admin/chats',
        icon:'cil-chat-bubble'
      },
    ]
  },
  {
    name:"HÓA ĐƠN",
    children:
    [
      {
        name: 'Hóa đơn bán hàng',
        url: '/admin/hoadons',   
        icon:'cil-notes'
      },
      {
        name:'Phiếu nhập hàng',
        url:'admin/taophieunhap',
        icon:'cil-list-rich'
      },
    ]
  },
];
