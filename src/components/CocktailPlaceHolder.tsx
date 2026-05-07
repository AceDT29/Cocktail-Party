
type placeProps = {
    holders: number,
    message: string,
    holderIcon: string
}

export function HolderComp({ holders, message, holderIcon }: placeProps) {
    const generatePlaceholders = () => {
        const placeholders = [];
        for (let i = 0; i < holders; i++) {
            placeholders.push(
                <li className="w-48 h-48 md:w-64 md:h-64 " key={i}>
                    <figure className='w-[90%] h-[90%] rounded-md'>
                        <img src={holderIcon} alt={`Placeholder ${i}`} />
                    </figure>
                </li>
            );
        }
        return placeholders;
    }
    return (
        <ul className="">
            <section className="flex flex-col justify-center items-center gap-4 opacity-30 animate-pulse ">
                <div className="flex flex-wrap justify-center gap-8 p-4 items-center">
                    {generatePlaceholders()}
                </div>
                <p className="text-2xl font-lexend text-center">{message}</p>
            </section>
        </ul>
    );
}
