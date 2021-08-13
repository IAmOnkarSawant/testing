// import { useEffect, useState } from 'react'
// import axios from 'axios'

// export default function useFetcher(pageNumber) {
//     const [loading, setLoading] = useState(true)
//     const [error, setError] = useState(false)
//     const [data, setData] = useState([])
//     const [hasMore, setHasMore] = useState(false)

//     useEffect(() => {
//         setLoading(true)
//         setError(false)
//         let cancel
//         axios({
//             method: 'GET',
//             url: '/posts/getposts/:categoryId',         //remaining
//             params: { page: pageNumber },
//             cancelToken: new axios.CancelToken(c => cancel = c)
//         }).then(res => {
//             console.log(res.data)
//             setData(prevData => {
//                 return [
//                     ...prevData,
//                     ...res.data              //remaining
//                 ]
//             })
//             setHasMore(res.data.docs.length > 0)    //remaining
//             setLoading(false)
//         }).catch(e => {
//             if (axios.isCancel(e)) return
//             setError(true)
//         })
//         return () => cancel()
//     }, [pageNumber])

//     return { loading, error, data, hasMore }
// }