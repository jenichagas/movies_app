import { useState } from "react";

interface MyListProps {
  myList: any[];
}

export default function MyListComponent({ movieId }: MyListProps) {
  const [myList, setMyList] = useState(<MyListProps[]>);

  return (
    <div>content</div>
  );
}
