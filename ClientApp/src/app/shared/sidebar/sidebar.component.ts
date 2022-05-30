import { Component, OnInit } from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  constructor() { }
  ngOnInit(): void {
    $('.js-show-sidebar').on('click',function(){
      $('.js-sidebar').addClass('show-sidebar');
  });
  $('.js-hide-sidebar').on('click',function(){
      $('.js-sidebar').removeClass('show-sidebar');
  });
  }
}
