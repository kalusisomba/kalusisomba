export class TrainingData {
    comment_id: number;
    comment: string;
    is_positive: boolean;
}

export class TrainingDataResponse {
    response: string;
    data: TrainingData[];
}