import React, {useState, useEffect} from 'react';

function Breadcrumb() {
    const [path, setPath] = useState('');
    const [crumbs, setCrumb] = useState([]);
    const [files, setFiles] = useState([]);

    useEffect(() => {
        async function getInitialPath(){
            const r = await fetch('http://localhost:3001/initial-path', {
                method: "GET",
              });
            const fullPath = await r.text();
            const pathArr = fullPath.split('\\');
            setCrumb(pathArr);
            setPath(fullPath);
        }

        async function getFiles(){
            const p = encodeURIComponent("C:\\alexwan\\file-browser");
            const r = await fetch(`http://localhost:3001/path/${p}`, {
                method: "GET",
              });
            const f = await r.json();
            setFiles(f);
        }
        
        getInitialPath();
        getFiles();
      }, []);

      useEffect(() => {
        async function getFiles(){
            const p = encodeURIComponent(path);
            console.log("test path", path, p);
            const pathArr = path.split('\\');
            console.log(pathArr);
            setCrumb(pathArr);
            const r = await fetch(`http://localhost:3001/path/${p}`, {
                method: "GET",
              });
            const f = await r.json();
            setFiles(f);
        }
        getFiles();
      },[path]) 
    

  function isLast(index) {
    return index === crumbs.length - 1;
  }


  const style = {
    backgroundColor: 'white',
    border: '1px solid rgba(0, 0, 0, 0.125)',
  }

  return (
    <div>
    <nav className="row justify-content-center mt-4">
      <ol className="breadcrumb" style={ style }>
        {
          crumbs.map((crumb, ci) => {
            const disabled = isLast(ci) ? 'disabled' : '';
            
            return (
              <li
                key={ ci }
                className="breadcrumb-item align-items-center"
              >
                <button className={ `btn btn-link ${ disabled }`} 
                onClick={()=> { setPath((prev) => prev.substring(0, prev.lastIndexOf(crumb) + crumb.length))}}
>
                  { crumb }
                </button>
              </li>
            );
          })
        }
      </ol>
    </nav>
    <ol>
    {
          files.map((file, i) => {
            const disabled = file.type === 'file' ? 'disabled' : '';
            
            return (
              <li
                key={ 'file' + i }
              >
                <button className={ `btn btn-link ${ disabled }`} onClick={()=> { setPath((prev) => prev + `\\${file.name}`);}}>
                  { file.name }
                </button>
              </li>
            );
          })
        }
        </ol>
    </div>
  );
}

export default Breadcrumb;