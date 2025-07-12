export interface UserParams {
    id: number,
    name: string,
    email: string,
    created_at: Date
}

export interface UserFormParams extends Omit<UserParams, 'id'> {

}