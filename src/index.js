import React from 'react'
import ReactDom from 'react-dom'
import './style.css'

// const paragraph = React.createElement(
//     'p',
//     'null',
//     'HELLO WORLD'
// );


// const name = 'Jamal :)'
// const paragraph = <p>Hello {name}</p>

// console.log(paragraph)


const tasks = [
    {
        id: 1,
        text: 'Learn React',
        isDone: false
    },
    {
        id: 2,
        text: 'React basics',
        isDone: true
    },
    {
        id: 3,
        text: 'Master React',
        isDone: false
    }
]



const Header = (props) => {
    console.log(props);
    return (
        <div className="header">
            <h1>{props.text} </h1>
        </div>
    );
}

class AddTI extends React.Component {
    // constructor(props) {
    //     super(props)
    //     this.state = {
    //         text : ""
    //     }
    //     }
    state = {
        // text: "Test"
        text: ""
    }
    onTextChange(event) {
        // console.log('hello there');
        let text = event.target.value
        // console.log(text);
        this.setState({ text: text })
    }
    handlebuttonOnClick = () => {
        this.props.onAddTask(this.state.text)
        this.setState({ text: "" })
    }

    render() {
        return (
            <div className="task-input-container" >
                {/* <input type="text" onChange={this.onTextChange.bind(this)}></input> */}
                <input type="text" onChange={(e) => this.onTextChange(e)} value={this.state.text} />
                <button onClick={this.handlebuttonOnClick}>ADD</button>
            </div >
        );
    }
}

const Task = (props) => {
    let { isDone, text, id } = props.tasks;
    let extraClass = isDone ? " done" : ""
    return (
        <div className={"task" + extraClass}>
            <input type="checkbox" checked={isDone} onChange={(e) => { props.onIsDoneUpdated(id, e.target.checked) }} />
            <span className="task-text">{text}</span>
            <button className="remove-btn" onClick={() => props.onRemoveTask(id)}>Remove</button>
        </div>
    );
}


class App extends React.Component {
    state = {
        tasks: this.props.tasks
    }
    onAddTask = (text) => {
        // console.log(text);
        let newTask = {
            text,
            isDone: false,
            id: Date.now()
        }
        this.setState((state) => {
            return { tasks: [...state.tasks, newTask] }
        })
    }

    onRemoveTask = (id) => {
        // console.log(id);
        this.setState((state) => {
            let updatedTasks = state.tasks.filter(task => task.id !== id)
            return ({ tasks: updatedTasks })
        })

    }

    onIsDoneUpdated = (id, isDone) => {
        // console.log(id, isDone);
        this.setState((state) => {
            let updatedTask = state.tasks.map((task) => {
                if (task.id === id) {
                    return { text: task.text, id: task.id, isDone }
                } else {
                    return task
                }
            })
            return { tasks: updatedTask }
        })

    }

    render() {
        let sortedTasks = this.state.tasks
        sortedTasks.sort((a, b) => a.isDone !== b.isDone && a.isDone === false ? -1 : 1)
        return (
            <div className="app" >
                {/* The Header */}
                <Header text="EPIC TO DO LIST" />
                {/* The Core  */}
                <AddTI onAddTask={this.onAddTask} />
                <div className="task-container">

                    {/* {this.state.tasks.map((tasks) => { */}
                    {sortedTasks.map((tasks) => {
                        return <Task key={tasks.id} tasks={tasks} onRemoveTask={this.onRemoveTask} onIsDoneUpdated={this.onIsDoneUpdated} />
                    })}

                    {/* task one */}
                    {/* <Task text="Learn Javascript" isDone={false}/> */}
                    {/* task two */}
                    {/* <Task text="Learn React" isDone={ true } /> */}
                    {/* task three */}
                    {/* <Task text="install VSCode" isDone={ true } /> */}

                </div>

            </div >
        );
    }



}

ReactDom.render(<App tasks={tasks} />, document.getElementById('root'))
// ReactDom.render(paragraph, document.getElementById('root'))