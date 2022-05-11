export class AddSearchKeyword {
    searchKeywordID: number;
    searchKeyword: string;
}

export class AddSearchKeywordResponse {
    response: string;
    data: AddSearchKeyword[];
}
