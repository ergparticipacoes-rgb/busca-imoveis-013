import {brl} from '../lib/utils'

export default function ListingCard({item}:{item:any}){
  const badgeColor=item.plan==='max'?'bg-yellow-400':item.plan==='pro'?'bg-yellow-200':'bg-gray-200'
  
  return(
    <div className='card hover:shadow-lg transition'>
      <div className='h-40 bg-gray-100 rounded-xl'></div>
      <div className='mt-2 flex justify-between items-center'>
        <h3 className='font-semibold text-[var(--petroleum)] text-sm'>{item.title}</h3>
        <span className={`text-xs px-2 py-1 rounded-full ${badgeColor}`}>{item.plan.toUpperCase()}</span>
      </div>
      <p className='text-sm font-bold text-[var(--gold)]'>{brl(Number(item.price))}</p>
      <p className='text-xs text-gray-500'>{item.city} • {item.type}</p>
      <a href={'/imovel/'+item._id} className='btn btn-primary mt-2 w-full text-center'>Ver detalhes</a>
    </div>
  )
}
