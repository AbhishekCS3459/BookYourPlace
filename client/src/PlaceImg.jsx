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
            //   src={'http://localhost:4000/uploads/' + place.photos[index]}
            //   alt=""
            // />
            <Image
            className={className}
            src={'http://localhost:4000/uploads/' + place.photos[index]}
            preview={{
              src: 'http://localhost:4000/uploads/' + place.photos[index],
            }}
          />
  )
}
