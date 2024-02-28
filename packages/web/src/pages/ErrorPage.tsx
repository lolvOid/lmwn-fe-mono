interface ErrorPageProps {
    status?: number,
    errorMessage?: string,
}

const ErrorPage = ({ errorMessage }: ErrorPageProps) => {
    return <>
        <div className="w-screen h-screen primary-bg flex flex-col gap-4 justify-center items-center">
                <h2 className="text-white font-bold text-4xl">Oops!</h2>
                <p className="text-white text-2xl">{errorMessage}</p>
        </div>
    </>
}
export default ErrorPage;