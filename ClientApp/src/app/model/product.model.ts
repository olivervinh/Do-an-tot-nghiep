export interface Product {
    id?: number;
    ten?: string;
    khuyenMai?: number;
    moTa?: string;
    tag?: string;
    image?: string;
    giaBan?: number;
    trangThaiSanPham?: string;
    trangThaiSanPhamThietKe?:string;
    trangThaiHoatDong?:string;
    huongDan?:string;
    thanhPhan?:string;
    tenNhanHieu?:string;
    tenLoai?:string;
    id_Loai?:number;
    gioiTinh?:number;
    imageSanPhams:imageSanPhams[];
    sanPhamBienThes:sanPhamBienThes[];
    like?:number;
}
export interface sanPhamBienThes {
    id?:number;
    id_SanPham?:number;
    tenMau?:string;
    soLuongTon?:number;
    tenSize?:string;
}
export interface imageSanPhams {
    id?:number;
    imageName?:string;
    idSanPham?:number;
}