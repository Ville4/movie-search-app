import { Image } from "antd"
import m from './Movie.module.css'

type propsType = {
    movie: {
        Title: string
        Poster: string
        Year: string
    } 
}

const Movie: React.FC<propsType> = ({movie}) => {
    const voidImg = 'data:image/png;base64,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'
    return (
        <>
            <h2 className={m.title} >{movie.Title}</h2>
            {movie.Poster === 'N/A'
                ? <Image
                    className={m.img}
                    width={280}
                    height={370}
                    src="error"
                    fallback={voidImg}
                />
                : <Image
                    className={m.img}
                    height={370}
                    width={280}
                    src={movie.Poster}
                    fallback={voidImg}
                />
            }
            <div className={m.year}>{movie.Year}</div>
        </>
    )
}

export default Movie

