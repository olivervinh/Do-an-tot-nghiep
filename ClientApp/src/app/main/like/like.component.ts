import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/service/product.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-contact',
  templateUrl: './like.component.html',
  styleUrls: ['./like.component.scss']
})
export class LikeComponent implements OnInit {

  list_sanphamyeuthich:any;
  constructor(public http:HttpClient,public route: ActivatedRoute,private cartService: CartService) {
    const clicks = localStorage.getItem('idUser');
  this.http.post("https://localhost:44302/api/sanphams/dslike/",{
    IdUser:clicks,
    }).subscribe(
      res=>{
        this.list_sanphamyeuthich=res;
      });
   }

  ngOnInit(): void {
  }
  deleteSanPham(product){
    this.http.post("https://localhost:44302/api/sanphams/deletelike/"+product.id,{

  }).subscribe(
    res=>{

      Swal.fire("Xoá sản phẩm thành công .", '', 'success');
      const clicks = localStorage.getItem('idUser');
      this.http.post("https://localhost:44302/api/sanphams/dslike/",{
        IdUser:clicks,
        }).subscribe(
          res=>{
            this.list_sanphamyeuthich=res;
          });
          this.cartService.DeleteProductInLove(product);

    })

  }
}
