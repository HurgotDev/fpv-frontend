export interface ISignupPropsView {
    handleSubmit: (data: { username: string; password: string; name: string; lastName: string }) => void
}
