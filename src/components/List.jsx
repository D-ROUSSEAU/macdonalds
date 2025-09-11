function List({data, onUpdate}) {

    const center = (p) => {
        const coords = [Number(p.lat), Number(p.lon)];
        const name = data.display_name;
        const city = data.name;
        onUpdate({ coords, name, city });
    }

    return (
        <>
            <li><a onClick={() => center(data)}>{data.display_name}</a></li>
        </>
    )
}

export default List;