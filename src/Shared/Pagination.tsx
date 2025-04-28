const Pagination = () => {
  return (
    <div className="flex justify-center mt-8">
      <div className="join">
        <button className="join-item btn">«</button>
        <button className="join-item btn btn-active">1</button>
        <button className="join-item btn">2</button>
        <button className="join-item btn">3</button>
        <button className="join-item btn">»</button>
      </div>
    </div>
  );
};

export default Pagination;
