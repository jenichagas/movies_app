export default function ComponentName() {
  return (
    <div>
      <div className="container">
        <label className="label">
          <input type="checkbox" className="input" />
          <span className="circle">
            <svg
              className="icon"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M12 19V5m0 14-4-4m4 4 4-4"
              />
            </svg>
            <div className="square" />
          </span>
          <p className="title">Download</p>
          <p className="title">Open</p>
        </label>
      </div>
    </div>
  );
}
