import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit, OnChanges{
  @Input()
  pageSize: number = 5;

  @Input()
  collectionSize: number = 0;

  @Input()
  pageSizes: number[] = [5, 10, 15, 20, 25]

  @Input()
  currentPage: number = 1;

  @Input()
  maxSize: number = 2

  @Input()
  firstLastButtons = false;

  @Input()
  nextPreviousButtons: boolean = true;

  totalPages: number[] = [];

  constructor() {
  }

  ngOnInit(): void {
    this.totalPages = new Array(Math.ceil(this.collectionSize / this.pageSize));
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.totalPages = new Array(Math.ceil(this.collectionSize / this.pageSize));
  }

  selectPageNumber(pageNumber: number): void{
    this.currentPage = pageNumber;
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  nextPage(){
    const nextPage = this.currentPage + 1;
    nextPage <= this.totalPages.length && this.selectPageNumber(nextPage);
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  previousPage(){
    const previousPage = this.currentPage - 1;
    previousPage >= 1 && this.selectPageNumber(previousPage);
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
}
