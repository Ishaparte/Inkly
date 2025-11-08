 import "../style/home.css"
 import ContactUs from "../components/ContactUs";
 import BookList from "../components/BookList";
 const Home=()=>{
    return (
          <main className="home">
      <div className='home-container'>
        <img className="book-image" src='./books.jpg'/>
        <div>
           <p className="home-content playfair-display">Sell and Buy your books Online!</p>
        <button className="home-btn playfair-display">Sell</button>
        <button className="home-btn playfair-display">Buy</button>
        </div>
       
        
      </div>
      <BookList/>
      
     </main>
     
     
    )
 }
 export default Home;