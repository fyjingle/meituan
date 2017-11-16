import fetch from "node-fetch"

async function apiRequest(host,path,method){    
    
    let _init = {
        method:method,
        headers:'application/x-www-form-urlencoded'
       /*  headers:{ */
           
           /*  "X-SAKHTTPCache-IgnoreQueryKey": "__reqTraceID",
            "userid": "265940599",
            "pragma-unionid": "c914586ccb1845d4b2b05c58654260e80000000000040702179",
            "Accept-Encoding": "gzip, deflate",
            "pragma-os": "MApi 1.1 (mtscope 5.10.1 appstore; iPhone 10.3.1 iPhone7,2; a0d0)",
            "Accept-Language": "zh-Hans-CN, en-US, en-us;q=0.8",
            "X-SAKURLCandyPolicy": "123",
            "Content-Length": "3183",
            "User-Agent": "com.meituan.itakeaway/4122 (unknown, iOS 10.3.1, iPhone, Scale/2.000000)",
            "siua": "gGeRP6xHSpna/xYrLSDZ15QOx1lE2qIphcMzq/FU1Umzb7EsMZksK+PrJiT4m52BY5xSt1R0hl5JRlghXWWqbs+Ye13clhA24mSBAwxdehBLIjQ8T60hZltF/fvYI8ZZxSjDcJG9SPZAhyO/wbe9shzcXKOIAibx1X3+BA4Y1QhQ40L7oM11Af+2t/jjpoLDGDv7Z69DW3yfbvfq/2WSDSyUHWxHnW/PnAtufgF1TnfpnlEFYmDxa1FbFh9xD8KE8BkquiHCmFYDCxCEFHofvX0ogoe3nir6RSk5xvilOM2PBV+PU0em5JzJGRA4myfRhUmTOtq9+nP5Y0oWkMH0Q9M5GC0MJN6r+3Xi1xIyYlHEHrusdljVJkDWtPux9wq5OKKOdgQWdgJ7VzTrSsjWuqtfqSq0097I67K7YAHThCUGwzfQg/ddePF40yFCACEeiuHFJuiQJCqczi609iTPkCA3stCj6lbt9MsvwNZWb312zGjZpbciyNuoJq1mMoL38o7CpJU2kYBlhdRzCXrsBWclNMFAw+6wiDir3B4O5y9HHMRvqfQVm3eLrlTvud6LNF0YIrx/8xNYIiseS7E8JqDSswDn34mBitoBghcvYRKeRcXn6enf4wGAtJANiGa1VxUmPJS2Y8UOumH4onReGA==",

            "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
            
            "Cookie":cookieParser("ci=91; cityid=91; _lx_utm=utm_term%3D5.10.1%26utm_content%3D74D23E5A539ACC80DB4C4E96A6A36345D789EEA2344BB4F415D4034F425EE2F8%26utm_source%3D2000%26utm_medium%3Diphone%26utm_campaign%3DAwaimaiBwaimaiGmineH0; _utm_campaign=AwaimaiBwaimaiGmineH0; _utm_content=74D23E5A539ACC80DB4C4E96A6A36345D789EEA2344BB4F415D4034F425EE2F8; _utm_medium=iphone; _utm_source=2000; _utm_term=5.10.1; dpid=; uuid=74D23E5A539ACC80DB4C4E96A6A36345D789EEA2344BB4F415D4034F425EE2F8; cityname='%E4%B8%9C%E8%8E%9E'; iuuid=74D23E5A539ACC80DB4C4E96A6A36345D789EEA2344BB4F415D4034F425EE2F8; _lxsdk_cuid=15e529a2d84c8-0e3e47117ec79b-304d5e33-3d10d-15e529a2d85c8") , */
            /* "category_type=0&fingerprint=LJmFDlYt0UaHTWQ%2BIJbBhBH3IXg%2FTHq7U1az%2BfOJXUbZYlUAdDeWIxHf%2FEQjTuiIm2CgHCTEf1Y228uajLFAnifabE6vY7GR6UbNVRwb4jp%2BznRrGKAhXgtGI9f4xL1nHi2oiBtgUGwWtIFcE4tEjmnVfzpjeHIiiKEEL2RHSOAPCSP6cx66kBbZ0XVZchrQvAZ8V1Kl2gDIt%2FBXH22jh5JzcgI%2BR01VH5FgP3LFROLoIlt59JTTjbTxjTNwGfgC82rqTxpeh%2BVtIp7FsIpXDhdW61%2BO9JrxOx23H0Vdv0diHwHGWPyV5qO4VcIREM7bJV%2F2BlJT9dEceDhrSBsEEqr26YO%2FgReibjKmBa4Azt4Rg1mVrDRDbGFfwzhUEYQ9nE2db598wTp5iYoU9jSzeEsTUv5fGod4eaO2qXasAHbNJggv9NehJknmCnZlL85P3rcZg%2FE0lF8L2I4FeLYiUCMqNPkfIA329vLMj1bNUP7dMpnEwkxyrpi5sd5rIFYY5fDak3P9OY92JetpGYCluTr66gh%2B10I9cqQh09lZADZOBuARBE%2FeGv0f9rxZ7OqNZ2gDVPEhmppqYQu8ryroADP4kcJXZHUE4YqfrBU2c4dBoCO5zgxERnN8N9jYLmhKHi8LrKLrfrwHlu8LenkXyFIyRRIvbT5v6jA%2BhBXIw9sHymUKbUMjP4o1QsfEDa2C83RwYxybzZ4UGpXa5jG0E4hjsub07erM6Weqkv1vaIQORpacafXVd0MVO0dUwj%2FSMoVNjLQLqH3GULnJbuDZQc9YHg0qOcikhnzbSDwm4QH%2FAycn5ksg1lX4OpiyFdhnN%2BBJ6wil0KBllaFlomC%2BVoDy3BCQ43yOnKiMPFWRRQL3i55KdO36dpyy3UKEg1xHtaD6GPNIdjPM%2BxE6ZFA4U%2B1I9d%2FaEe0cuQsTZboKmS4FP7I11iincm0ipOAbQmaQq2E%2BHZVI1frGCIjFi%2BnP95IsM2GKgJkmZ8Z6nHShPIo6MOdz%2BH1HA8KoXV%2FRYUnUB5Epr4dRaxD1x5PkS58247HAnaxdj8f5e5wDMP%2BxCtHUgq%2FrTvRV1jk8ciPzSgNsR0O2sdsoNYgy6lX0oEdl5C43fxy1ScG%2FcUfMp%2BT1P0dAHZD4e%2Fh%2FfEc07c6JCs1G%2FhhHpTly1eSz3F3oD7eqi2Q9AGyhblLLVSM4L%2FGZPwg%3D&latitude=22907602&load_type=1&longitude=113875320&navigate_type=0&page_index=0&page_size=20&preload=0&rank_trace_id=&second_category_type=0&sort_type=0&trace_tag=%7B%22src_block%22%3A%22b_welcome%22%2C%22tgt_block%22%3A[%22b_poilist%22]%2C%22tgt_page%22%3A%22p_homepage%22%2C%22src_page%22%3A%22p_welcome%22%2C%22req_time%22%3A%221510130902093%22%2C%22action%22%3A%22click%22%7D&wm_fingerprint=X5IG7izeH9Q9TlTqqFrje%2B1k%2B0WJUn6bY0II9SkqUYgQw%2FuDG8C4qncFcAYE8yfWav4f3sjQ2QW2qTnB2Nymfg%2BIEfIybh6Kj6ogiG3iQyLkeTmCxojgx13yXgW1EJlzSatQDqESNlCtZzbjpJy49q7MzgE2Ex8vpjdd%2FpHaGP4%2FZckI%2FMLNNfaMfmdtLkmc%2BfNRWkSyWEMWBvYuTdesQfodtcgcmj2nmUlQUyJVLnFIx%2BiAl7eqcHutmjqqLty18d14WP9BTCzo4yewmAQR%2BHc38X7IERo9uW%2FB1iHVKUOc4vstauSyF0OIfdfCCUCXpWSuIiJb4RFTFCm5JtMOyTUkxw1D9x%2Fs9aFaUGDWOWqaMt%2B1GQN0UFLYdCK8Y6S%2FaZ80rnC6SacFoVIaqJRTodbTzXbR3UkTmfzvNw7lSU9hxNjI3Fu75ADvFkWpfbraZ3dR3ikh%2Bx7L3L5qnYDfINXPJ1fuQPowZb9ow3NurZYN%2BfH4J1pcMi5CIoOS3RtI%2BAecp0fnaWLtjge4Qj19ZK08OCf9RjAYNng7wszITb3X8guHcHlLnyrOmTZGw%2Bh4f7RD0%2Bceg8WkncBRyPCMbilXkLxaCuWVdQfLhruC9eUYkEezDI%2BMvNg30LrAFcuMjwrFW4gCKywqDzOMZ99XTR%2FFM8YH8SpjCQCO3SIHyk1Zq6Ql0UY3i1Vv4T4K9NkqrOJj3dvTZOz7xaM%2FeAxvwj3wjUp1pGUG%2FJ4lIB5hUrVld7aC5S8ZGYSYX6OsY4yfz9V9uOo05z75Qs4Oaf0%2Bd34wcuvxjaaeG99r%2BI8jn5cM5LYiw3Xl45WI0aiGiay57rpe1F7g0TRu1tnb%2BE2jHv3COWy5mdkppfDP7nqvzcec7%2FlHCV%2Fj7xbP584SZPhemIVAI%2Bn4ZPcgoHiTUifgJcpRL%2F3kWLKDpW%2FtmMFmg9AMhJrDK4nE6QJWdl4aFK9EfJkvHfwU17u7v5OUyvUEUG2Blpo6tGUNem1lQ9gkng5pX6gE6AG2ZLgx9uQcyKUxhxcPk4Gb%2FmVQl%2BKSvYvQZ1wQbGk9u837WtLpkn0B6rJsuxt1EMjVYfHyKPTBrcCJ8zi9j1mTBNgMC0mkPMvZvHVMOTGkdWcriTaTIABmcBYraEAV0f%2FtHLU82u6z6ziV9C4ZxUae93siuioiIy2Wbgv4W2zplFPRGJ%2BcpMFIReuRMq%2FEq60afsR3dPh6qbLlbl47x57%2BHYjZwWBYuaTzLv%2BlyVRSzDc2Mns3La79VuHI%2B%2BbJqeATbayhEB%2BNhi2qF85ZHO4bIaZeR2F352wE3BVi5VvwHJWzUgrjAp0AHY%2Fmnpxv%2FuZHrz4ujpBCvhJXLUsHeNQeNY0DyOI1NMuoMF5YULvTP4NQNozVCTVvRuZcChDqE0vCqDGOHnylrWfX" */
       /*  } */
    };
    try{
        
        let res = await fetch(host+path,_init);
        var data = await res.text();
        
    }catch(error){
        console.log("error in apiRequest",error);
       return error;
    }
    return data;
}

function cookieParser(cookies) {
    
    const result = {}
    cookies.forEach(cookie => {
        const temp = cookie.split(';')
        temp.forEach(val => {
            const flag = val.split('=')
            result[flag[0]] = flag.length === 1 ? '' : flag[1]
        })
    })
    console.log(result);
    return result;
}

module.exports = apiRequest;