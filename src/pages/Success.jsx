import React,{useState,useEffect} from 'react'

export default function Success(props) {
  

  const [isLoading, setIsLoading] = useState(true);
  const [unavailabe, setUnavailable] = useState(false);
  const [Text, setText] = useState(null);

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  useEffect(() => {
    const Confirm_order = async () => {
      const Curr_url = window.location.href;
      const urlObject = new URL(Curr_url);

      const Obj_id = urlObject.searchParams.get('id');
      const u_id = urlObject.searchParams.get('uid');
      props.setUid(u_id)
      // console.log(paramValue)
      try {
        const url = "https://clashmarketplace-backend.onrender.com/add_to_owned_accounts";
        const data = { 
          "user_id":u_id,
          "document_id":Obj_id,
        };
  
      
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }); // Replace with your API endpoint
        const jsonData = await response.json();
        setText("Added to your account sccessfully");
        console.log(jsonData);
        setIsLoading(false);
      } catch (error) {
        console.log('Error:', error);
        setUnavailable(true);
      }
    };

    sleep(5000).then(()=> Confirm_order());
  }, []);
  if (unavailabe) {
    return (<div className='Loading_pg'>
      <h1>
        Unable to load content
        </h1>
      </div>); // Display loader while fetching data
  }

  if (isLoading) {
    return (
    <div className='Loading_pg'>
      <h1 className='loading'>
        Loading...
        </h1>
    </div> // Display loader while fetching data
    );
  }

  return (
    <div id="Saletiles">
      <h1>{Text}</h1>
    </div>
  );
}
