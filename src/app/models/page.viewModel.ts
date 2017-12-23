export class PageViewModel<T> {

    totalPageCount: number;

    totalMemberCoun: number;

    pageNumber: number = 1;

    pageSize: number = 10;

    data: T[] = [];
}