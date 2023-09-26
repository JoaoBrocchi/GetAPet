import Styles from "./RoundedImage.module.css"

function RoundedImage(alt,src){
    return (
        <img
            className={`${Styles.Rounded_image} ${Styles.Rounded_image}`}
            src={src}
            alt={alt}
        />
    )
}
export default RoundedImage;