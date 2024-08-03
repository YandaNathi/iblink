function Widget() {
  return (
    <div className="fixed right-0 flex flex-col gap-6">
      <div className="p-4 bg-white rounded-lg shadow-md text-sm">
        <h3 className="text-lg font-semibold mb-2">Sponsored Ads</h3>
        <iframe
          src="https://www.adweek.com/category/gaming/"
          title="Ads"
          className="w-full h-full"
        />
      </div>
      <button className="bg-gray-200 text-gray-500 p-2 text-xs rounded-lg">
        Learn more
      </button>
      <div className="p-4 bg-white rounded-lg shadow-md text-sm">
        <h3 className="text-lg font-semibold mb-2">Latest News</h3>
        <iframe
          src="https://businesstech.co.za/news/"
          title="News"
          className="w-full h-full"
        />
    
      </div>
      <button className="bg-gray-200 text-gray-500 p-2 text-xs rounded-lg">
        Learn more
      </button>
    </div>
  );
}

export default Widget;
