
const UserCard = ({user, type = "feed", onAccept, onReject, onInterested, onIgnored}) => {
    if (!user) return <div className="p-4">Loading...</div>;

    const { firstName, lastName, photoUrl, age, gender, about } = user;

  const renderButtons = () => {
    if (type === "request") {
      return (
        <>
          <button
            className="btn btn-success"
            onClick={onAccept}
          >
            Accepted
          </button>
          <button
            className="btn btn-error"
            onClick={onReject}
          >
            Rejected
          </button>
        </>
      );
    }
    if (type === "connection") {
      return null;
    }
    return (
      <>
        <button className="btn btn-primary" onClick={onInterested}>Interested</button>
        <button className="btn btn-primary" onClick={onIgnored}>Ignored</button>
      </>
    );
  };

  return (
    <div className="card bg-white w-96 shadow-lg">
  <figure className="bg-gradient-to-b from-blue-400 to-blue-600 h-72 flex items-center justify-center">
    {photoUrl ? (
      <img
        src={photoUrl}
        alt="Photo"
        className="w-full h-full object-cover" />
    ) : (
      <div className="text-white text-6xl">👤</div>
    )}
  </figure>
  <div className="card-body">
    <h2 className="card-title text-gray-800">{firstName + " " + lastName}</h2>
    <p className="text-gray-600">{age} {gender} • {about}</p>
    <div className="card-actions justify-end">
      {renderButtons()}
    </div>
  </div>
</div>
  )
}

export default UserCard;