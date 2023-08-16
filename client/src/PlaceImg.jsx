import { Image } from 'antd';
export default function PlaceImg({place,index=0,className=null}) {
  if(!place.photos.length){
    return ''  
}
if(!className){
    //className="object-cover rounded-2xl"
    className='object-cover  rounded-2xl md:h-[100%] '
}
    return (
            <Image
            className={className}
            src={'https://backend-book-3fsl.onrender.com/uploads/' + place.photos[index]}
            preview={{
              src: 'https://backend-book-3fsl.onrender.com/uploads/' + place.photos[index],
            }}
          />
  )
}
