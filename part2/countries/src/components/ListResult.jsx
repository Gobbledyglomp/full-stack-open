const ListResult = ({ list, onClick }) => (
    <table>
        <tbody>
            {list.map(country =>
                <tr key={country}>                
                    <td style={{'width': '215px'}}> 
                        <label>{country}</label>
                    </td>
                    <td>
                        <button onClick={(e) => onClick(e, country)}>Show</button>
                    </td>              
                </tr>
            )}
        </tbody>
    </table>
)

export default ListResult