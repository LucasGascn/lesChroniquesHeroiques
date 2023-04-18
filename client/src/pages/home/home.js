

const FormPj = [{
    inputName:'name1',
    value : 'value1',
    inputId : 'id1',
    },
    {
    inputName:'name2',
    value : 'value2',
    inputId : 'id2',
    },
{
    inputName:'value3',

    value : 'value3',
    inputId : 'id3',
    },
    {
    inputName:'value4',
    value : 'value4',
    inputId : 'id4',
    },
    {
    inputName:'value5',
    value : 'value5',
    inputId : 'id5',
    },];


    
function Home() {
    const FPJ = FormPj.map((FPJ) => (
        <div key={FPJ.inputId}>
        <label htmlFor={FPJ.inputId}>{FPJ.inputName}:</label>
        <input type="text" id={FPJ.inputId} name={FPJ.inputName} value={FPJ.value} />
        </div>
    ));
      
    return (
        <div>
        <form>
            {FPJ}
        </form>
        </div>
    );
    }
 
  export default Home;