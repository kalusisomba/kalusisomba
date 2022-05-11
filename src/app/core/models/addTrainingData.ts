export class AddTrainingData {
    comment_id: number;
    comment: string;
    is_positive: boolean;
}

export class AddTrainingDataResponse {
    response: string;
    data: AddTrainingData[];
}