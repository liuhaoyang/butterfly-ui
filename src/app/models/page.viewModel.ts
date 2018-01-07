export class PageViewModel<T> {

    totalPageCount: number;

    totalMemberCount: number;

    pageNumber: number = 1;

    pageSize: number = 10;

    data: T[] = [];
}