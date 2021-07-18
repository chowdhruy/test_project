/**
 * Created by Sovon on 11/9/2017.
 */

export interface Pagination {
    current_page: number;
    from: number;
    last_page: number;
    next_page_url: string;
    path: string;
    per_page: number;
    prev_page_url: string;
    to: number;
    total: number;
}
