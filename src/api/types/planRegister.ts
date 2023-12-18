export interface IRegisterForm {
    planId: number | null;
    title: string | null;
    author: string | null;
    publisher: string | null
    totalPage: string | number | null;
    currentPage: string;
    startDate: string;
    endDate: string;
}
