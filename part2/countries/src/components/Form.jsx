const Form = ({ value, onChange }) => (
    <form>
        <div>
            Find countries: <input 
                value={value} 
                onChange={onChange} 
            />
        </div>
    </form>
)

export default Form