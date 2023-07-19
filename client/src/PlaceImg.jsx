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
     
            // <img
            //   className={className}
            //   src={'https://bookyourplace.onrender.com/uploads/' + place.photos[index]}
            //   alt=""
            // />
            <Image
            className={className}
            src={'https://bookyourplace.onrender.com/uploads/' + place.photos[index]}
            preview={{
              src: 'https://bookyourplace.onrender.com/uploads/' + place.photos[index],
            }}
          />
  )
}
