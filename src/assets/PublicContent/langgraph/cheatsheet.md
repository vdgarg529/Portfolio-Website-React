
# LangGraph: Detailed Chapter-Wise Notes

# Chapter 1: Introduction to LangGraph

## 1.1 What Is LangGraph?

LangGraph is a low-level orchestration framework for building stateful, long-running and controllable AI applications.

It is especially useful for applications that require:

```text
Multiple processing steps
Conditional routing
Loops
State management
Tool execution
Human approval
Conversation memory
Persistence
Streaming
Failure recovery
Multi-agent coordination
```

LangGraph represents an application as a directed graph.

```text
Input
  ↓
Node A
  ↓
Node B
  ↓
Node C
  ↓
Output
```

More complex workflows can branch and loop:

```text
             ┌─────────────┐
             │ Retrieve     │
             └──────┬──────┘
                    ↓
Input → Classify → Generate → Evaluate
            ↓                     │
        Direct answer             │
                                  ↓
                           Good enough?
                            ↙         ↘
                           No          Yes
                           ↓            ↓
                         Revise        END
```

LangGraph’s main purpose is not merely connecting LLM calls. It manages how an application progresses through stateful steps over time.

---

## 1.2 Why Is LangGraph Needed?

A simple LLM application may look like:

```python
response = model.invoke(
    "Explain machine learning."
)
```

However, real-world AI systems may need to:

```text
Retrieve information
Call external tools
Check permissions
Ask for human approval
Retry failed operations
Remember previous interactions
Select different execution paths
Resume after interruption
```

Implementing all this with nested `if` statements and loops quickly becomes difficult to maintain.

LangGraph provides explicit structures for:

```text
State
Nodes
Edges
Routing
Persistence
Interruptions
Execution history
```

---

## 1.3 When Should LangGraph Be Used?

Use LangGraph when:

```text
The application has several processing stages

Execution can follow different paths

A step may need to repeat

The workflow must maintain state

The process may pause and resume

Human approval is required

The system uses multiple agents

The workflow may run for a long time

Failures should resume from saved progress
```

Common examples:

```text
Research assistants
RAG workflows
Customer-support agents
Approval-based SQL agents
Document-review systems
Incident-response agents
Multi-agent systems
Content generation and review
Long-running automation
```

---

## 1.4 When Is LangGraph Unnecessary?

LangGraph may be unnecessary when:

```text
There is one model call

The workflow is completely linear and simple

No state must persist

No branching or looping is required

A LangChain create_agent() implementation already solves the problem
```

Example:

```python
prompt = prompt_template.invoke({
    "topic": "Python"
})

response = model.invoke(prompt)
```

For this case, a normal LangChain chain is usually simpler.

---

# Chapter 2: LangGraph in the LangChain Ecosystem

## 2.1 LangChain

LangChain provides higher-level abstractions for:

```text
Chat models
Prompt templates
Tools
Agents
Retrievers
Structured output
Middleware
```

Use LangChain when you want to build a standard agent or LLM application quickly.

---

## 2.2 LangGraph

LangGraph provides lower-level control over:

```text
State
Execution flow
Loops
Persistence
Interruptions
Subgraphs
Long-running tasks
```

Use it when standard agent behaviour is not enough.

---

## 2.3 LangSmith

LangSmith provides:

```text
Tracing
Debugging
Evaluation
Monitoring
Prompt management
Deployment support
```

It helps you inspect how every graph node, tool and model call behaved.

---

## 2.4 Relationship Between the Components

```text
LangChain
High-level models, tools and agents
              ↓
LangGraph
Stateful orchestration runtime
              ↓
LangSmith
Tracing, evaluation and monitoring
```

A LangGraph application can use LangChain components, but LangGraph does not require LangChain for every node.

A node may contain:

```text
An LLM call
A database query
Normal Python logic
An API request
A machine-learning model
A human approval step
```

---

## 2.5 LangChain Agent vs LangGraph

Use a LangChain agent when:

```text
You need a standard model-tool loop
The model selects tools
The architecture is common
You want minimal code
```

Use LangGraph when:

```text
Tool order must be controlled
Some steps are deterministic
There are approval gates
There are custom loops
There are several specialized agents
State must be inspected and modified
```

---

# Chapter 3: Installation and Setup

## 3.1 Install LangGraph

```bash
pip install -U langgraph
```

Install LangChain:

```bash
pip install -U langchain
```

Install an OpenAI integration:

```bash
pip install -U langchain-openai
```

Install environment-variable support:

```bash
pip install python-dotenv
```

---

## 3.2 Common Imports

```python
from typing import Annotated, Literal
from typing_extensions import TypedDict

from langgraph.graph import (
    StateGraph,
    START,
    END,
    MessagesState
)

from langgraph.types import (
    Command,
    Send,
    interrupt
)

from langgraph.checkpoint.memory import (
    InMemorySaver
)
```

For tools:

```python
from langchain_core.tools import tool

from langgraph.prebuilt import (
    ToolNode,
    tools_condition
)
```

For persistent cross-thread memory:

```python
from langgraph.store.memory import (
    InMemoryStore
)
```

---

## 3.3 Recommended Project Structure

```text
langgraph_project/
│
├── app/
│   ├── state.py
│   ├── nodes.py
│   ├── routing.py
│   ├── tools.py
│   ├── graphs.py
│   ├── memory.py
│   └── config.py
│
├── tests/
│   ├── test_nodes.py
│   ├── test_routing.py
│   ├── test_tools.py
│   └── test_graph.py
│
├── data/
├── notebooks/
├── .env
├── requirements.txt
└── main.py
```

---

# Chapter 4: Core Mental Model

## 4.1 The Three Core Components

A LangGraph workflow contains:

```text
State
Nodes
Edges
```

### State

The current data available to the workflow.

### Nodes

Functions that perform work and update state.

### Edges

Connections that determine which node executes next.

LangGraph nodes read shared state and return partial state updates. Edges define static or conditional transitions.

---

## 4.2 Simple Example

```python
from typing_extensions import TypedDict

from langgraph.graph import (
    StateGraph,
    START,
    END
)


class State(TypedDict):
    message: str
    result: str


def process_message(
    state: State
):
    return {
        "result": state["message"].upper()
    }


builder = StateGraph(State)

builder.add_node(
    "process",
    process_message
)

builder.add_edge(
    START,
    "process"
)

builder.add_edge(
    "process",
    END
)

graph = builder.compile()
```

Invoke:

```python
result = graph.invoke({
    "message": "hello",
    "result": ""
})

print(result)
```

Output:

```python
{
    "message": "hello",
    "result": "HELLO"
}
```

---

## 4.3 Compilation

A graph must be compiled before it can be executed.

```python
graph = builder.compile()
```

Compilation performs structural checks and creates an executable graph object.

During compilation, you can configure:

```text
Checkpointer
Store
Cache
Interrupt points
Debugging options
```

LangGraph requires graph compilation before invocation.

---

## 4.4 Super-Steps

LangGraph executes workflows in discrete iterations called super-steps.

Nodes scheduled in the same super-step can run in parallel.

Example:

```text
             ┌→ Node B ─┐
START → Node A          ├→ Node D
             └→ Node C ─┘
```

Execution:

```text
Super-step 1:
Node A

Super-step 2:
Node B and Node C in parallel

Super-step 3:
Node D
```

Checkpoints are commonly saved at super-step boundaries when persistence is enabled.

---

# Chapter 5: Defining Graph State

## 5.1 What Is State?

State is the shared data structure used by nodes.

Example:

```python
class State(TypedDict):
    user_query: str
    documents: list[str]
    answer: str
```

A node can read any required state key:

```python
def generate_answer(
    state: State
):
    query = state["user_query"]
    documents = state["documents"]

    return {
        "answer": (
            f"Answering {query} using "
            f"{len(documents)} documents."
        )
    }
```

---

## 5.2 Nodes Return Partial State

A node does not need to return the complete state.

```python
def node(state: State):
    return {
        "answer": "Completed"
    }
```

Existing keys remain unchanged unless updated.

Input:

```python
{
    "user_query": "What is RAG?",
    "documents": ["Document 1"],
    "answer": ""
}
```

Output after node update:

```python
{
    "user_query": "What is RAG?",
    "documents": ["Document 1"],
    "answer": "Completed"
}
```

---

## 5.3 TypedDict State

```python
from typing_extensions import TypedDict


class State(TypedDict):
    query: str
    result: str
```

Use `TypedDict` when:

```text
You want a lightweight schema
Performance matters
Default values are unnecessary
You want static type checking
```

The official documentation presents `TypedDict` as the common state-schema choice.

---

## 5.4 Dataclass State

```python
from dataclasses import dataclass,
    field


@dataclass
class State:
    query: str = ""
    results: list[str] = field(
        default_factory=list
    )
```

Use a dataclass when:

```text
You want default values
You want object-style fields
You need lightweight structured state
```

---

## 5.5 Pydantic State

```python
from pydantic import BaseModel,
    Field


class State(BaseModel):
    query: str
    confidence: float = Field(
        ge=0,
        le=1
    )
```

Use Pydantic when:

```text
Runtime validation is important
Fields have constraints
Input must be validated recursively
```

Pydantic is generally more expensive than `TypedDict` or dataclasses.

---

## 5.6 Input and Output Schemas

The internal graph may contain state that should not be exposed as input or output.

```python
class InputState(TypedDict):
    query: str


class OutputState(TypedDict):
    answer: str


class OverallState(TypedDict):
    query: str
    documents: list[str]
    analysis: str
    answer: str
```

Create:

```python
builder = StateGraph(
    OverallState,
    input_schema=InputState,
    output_schema=OutputState
)
```

Invoke:

```python
result = graph.invoke({
    "query": "Explain LangGraph."
})
```

Returned output:

```python
{
    "answer": "..."
}
```

Internal fields can remain hidden from normal `invoke()` output, though full-state streaming may still expose them unless output keys are restricted.

---

## 5.7 What Should Be Stored in State?

Store:

```text
Raw user input
Messages
Retrieved documents
Classification result
Intermediate analysis
Tool results
Workflow status
Approval result
Final output
Error information
Iteration counters
```

Avoid storing:

```text
Large duplicated strings
Unnecessary formatted prompts
Database connections
Model clients
Secrets
Temporary objects that cannot be serialized
```

Dependencies such as models and database clients are usually better passed through runtime context.

---

# Chapter 6: Reducers

## 6.1 What Is a Reducer?

A reducer controls how a node update is combined with the current state value.

Without a reducer:

```text
New value replaces old value
```

With a reducer:

```text
New value is combined with old value
```

Each state key can have its own reducer. A reducer receives the current value and the new node update, then returns the value to store.

---

## 6.2 Default Replacement Behaviour

```python
class State(TypedDict):
    status: str
```

Node A:

```python
return {
    "status": "processing"
}
```

Node B:

```python
return {
    "status": "completed"
}
```

Final value:

```text
completed
```

The later update replaces the previous value.

---

## 6.3 Append Reducer

```python
from operator import add
from typing import Annotated


class State(TypedDict):
    logs: Annotated[
        list[str],
        add
    ]
```

Node A:

```python
return {
    "logs": ["Node A completed"]
}
```

Node B:

```python
return {
    "logs": ["Node B completed"]
}
```

Final state:

```python
{
    "logs": [
        "Node A completed",
        "Node B completed"
    ]
}
```

---

## 6.4 Custom Reducer

```python
def merge_unique(
    current: list[str],
    update: list[str]
) -> list[str]:
    return list(
        dict.fromkeys(
            current + update
        )
    )


class State(TypedDict):
    sources: Annotated[
        list[str],
        merge_unique
    ]
```

Use custom reducers when:

```text
Duplicates should be removed
Dictionaries must be merged
Values should be capped
Updates need domain-specific logic
```

---

## 6.5 Parallel Updates Require Care

Suppose Node B and Node C run in parallel:

```text
        ┌→ B ─┐
A ──────┤     ├→ D
        └→ C ─┘
```

Both return:

```python
{
    "results": [...]
}
```

If `results` has no suitable reducer, LangGraph may not know how to combine concurrent writes.

Define:

```python
class State(TypedDict):
    results: Annotated[
        list[str],
        add
    ]
```

Use reducers whenever parallel nodes update the same key.

---

## 6.6 Reducer Design Rules

Reducers should ideally be:

```text
Deterministic
Side-effect free
Fast
Associative where possible
Easy to test
```

Avoid reducers that:

```text
Call APIs
Modify databases
Depend on random values
Use global mutable state
```

---

# Chapter 7: MessagesState and Message Reducers

## 7.1 Why Store Messages?

Chat models usually receive a list of messages.

A graph may need to store:

```text
User messages
AI responses
Tool requests
Tool results
System-generated messages
```

---

## 7.2 Manual Message State

```python
from typing import Annotated

from langchain.messages import (
    AnyMessage
)

from langgraph.graph.message import (
    add_messages
)


class State(TypedDict):
    messages: Annotated[
        list[AnyMessage],
        add_messages
    ]
```

The `add_messages` reducer appends new messages while also supporting message replacement by message ID.

---

## 7.3 MessagesState

LangGraph provides a built-in schema:

```python
from langgraph.graph import (
    MessagesState
)
```

Use:

```python
builder = StateGraph(
    MessagesState
)
```

`MessagesState` already includes:

```python
messages: Annotated[
    list[AnyMessage],
    add_messages
]
```

---

## 7.4 Extend MessagesState

```python
class State(MessagesState):
    user_id: str
    documents: list[str]
    final_answer: str
```

Use this when building:

```text
Chat agents
Tool-calling workflows
Conversational RAG
Multi-turn assistants
```

---

## 7.5 Access the Latest Message

```python
def inspect_message(
    state: MessagesState
):
    latest_message = (
        state["messages"][-1]
    )

    print(
        latest_message.content
    )

    return {}
```

---

# Chapter 8: Nodes

## 8.1 What Is a Node?

A node is a Python callable that:

```text
Receives state
Performs work
Returns a partial state update
```

```python
def node_name(
    state: State
):
    return {
        "some_key": "new value"
    }
```

Nodes may be synchronous or asynchronous and can also receive runtime configuration and context.

---

## 8.2 Add a Node

```python
builder.add_node(
    "process_query",
    process_query
)
```

When the function name is suitable:

```python
builder.add_node(
    process_query
)
```

The function name becomes the node name.

---

## 8.3 Async Node

```python
async def retrieve_data(
    state: State
):
    result = await async_api_call(
        state["query"]
    )

    return {
        "data": result
    }
```

Add normally:

```python
builder.add_node(
    "retrieve_data",
    retrieve_data
)
```

Invoke asynchronously:

```python
result = await graph.ainvoke(
    initial_state
)
```

---

## 8.4 Keep Nodes Focused

Good node:

```text
Classify request
```

Poor node:

```text
Classify request, query database, generate answer,
send email and update account
```

Prefer one responsibility per node.

Benefits:

```text
Easier testing
Clearer tracing
Better retries
Simpler state
Better human review
More useful streaming
```

---

## 8.5 Deterministic Nodes

```python
def calculate_total(
    state: State
):
    total = sum(
        state["values"]
    )

    return {
        "total": total
    }
```

Use normal Python for operations that do not require an LLM.

Do not use an LLM to:

```text
Add numbers
Validate a fixed enum
Check exact permissions
Sort values
Apply known business rules
```

---

## 8.6 LLM Nodes

```python
def call_model(
    state: MessagesState
):
    response = model.invoke(
        state["messages"]
    )

    return {
        "messages": [response]
    }
```

Use an LLM node for:

```text
Natural-language understanding
Summarization
Classification with ambiguous language
Reasoning over unstructured text
Response generation
```

---

## 8.7 Side Effects in Nodes

Side effects include:

```text
Writing to a database
Sending email
Updating files
Making payments
Publishing content
```

Nodes may be re-executed after interruption or failure.

Therefore, side effects should be idempotent.

Use:

```text
Idempotency keys
Upserts
Read-before-write checks
Transaction IDs
Deduplication
```

LangGraph checkpoints are saved at graph boundaries, so a resumed node may start again from the beginning.

---

# Chapter 9: Edges

## 9.1 What Is an Edge?

An edge determines what executes after a node.

Types:

```text
Normal edge
Conditional edge
Conditional entry point
Dynamic Send
Command-based routing
```

---

## 9.2 Normal Edge

```python
builder.add_edge(
    "node_a",
    "node_b"
)
```

Meaning:

```text
Always execute node_b after node_a.
```

---

## 9.3 START

`START` is a special graph entry node.

```python
builder.add_edge(
    START,
    "first_node"
)
```

---

## 9.4 END

`END` is a special terminal node.

```python
builder.add_edge(
    "last_node",
    END
)
```

`START` identifies initial execution, while `END` represents graph termination.

---

## 9.5 Parallel Edges

```python
builder.add_edge(
    "prepare",
    "analyze_sales"
)

builder.add_edge(
    "prepare",
    "analyze_customers"
)
```

Both destination nodes are scheduled in the next super-step and may execute in parallel.

Use parallel nodes when tasks are independent.

---

# Chapter 10: Conditional Routing

## 10.1 Routing Function

```python
def route_request(
    state: State
) -> Literal[
    "technical",
    "billing"
]:
    if state["category"] == "technical":
        return "technical"

    return "billing"
```

Add conditional edges:

```python
builder.add_conditional_edges(
    "classify",
    route_request,
    {
        "technical": "technical_node",
        "billing": "billing_node"
    }
)
```

---

## 10.2 Route to END

```python
def should_continue(
    state: State
) -> Literal[
    "continue",
    END
]:
    if state["complete"]:
        return END

    return "continue"
```

Use:

```python
builder.add_conditional_edges(
    "evaluate",
    should_continue
)
```

---

## 10.3 Conditional Entry Point

```python
def select_start(
    state: State
) -> Literal[
    "fast_path",
    "full_path"
]:
    if state["priority"] == "high":
        return "fast_path"

    return "full_path"
```

```python
builder.add_conditional_edges(
    START,
    select_start
)
```

---

## 10.4 When to Use Conditional Edges

Use conditional edges when:

```text
The routing decision does not need to update state

The next node depends on existing state

Several possible destinations exist
```

Use `Command` instead when routing and state updates must happen together.

---

## 10.5 Avoid Mixed Routing

Do not combine from the same node:

```text
Static add_edge()
and
Command(goto=...)
```

unless both destinations should execute.

Similarly, avoid combining static edges and conditional routing unintentionally.

Both routes may run.

---

# Chapter 11: Loops

## 11.1 Basic Loop

```text
Generate
   ↓
Evaluate
   ↓
Pass?
 ↙   ↘
No    Yes
↓      ↓
Revise END
  ↓
Evaluate
```

---

## 11.2 Loop State

```python
class State(TypedDict):
    draft: str
    feedback: str
    approved: bool
    iteration: int
```

---

## 11.3 Evaluation Router

```python
def route_after_review(
    state: State
) -> Literal[
    "revise",
    END
]:
    if state["approved"]:
        return END

    return "revise"
```

---

## 11.4 Limit Iterations

```python
def route_after_review(
    state: State
) -> Literal[
    "revise",
    END
]:
    if state["approved"]:
        return END

    if state["iteration"] >= 3:
        return END

    return "revise"
```

Every loop should have a termination condition.

Possible limits:

```text
Maximum iteration count
Maximum model-call count
Time limit
Confidence threshold
Approval status
Cost threshold
```

---

## 11.5 Recursion Limit

Configure maximum graph super-steps:

```python
result = graph.invoke(
    initial_state,
    config={
        "recursion_limit": 50
    }
)
```

A graph raises a recursion error if it exceeds the configured limit.

The recursion limit belongs at the top level of graph config, not inside `configurable`.

---

# Chapter 12: Command

## 12.1 What Is Command?

`Command` combines:

```text
State updates
Routing
Parent-graph navigation
Interrupt resumption
```

It supports:

```python
Command(
    update=...,
    goto=...,
    graph=...,
    resume=...
)
```

---

## 12.2 Update and Route Together

```python
from langgraph.types import (
    Command
)


def classify(
    state: State
) -> Command[
    Literal[
        "technical",
        "billing"
    ]
]:
    if "error" in state["query"].lower():
        return Command(
            update={
                "category": "technical"
            },
            goto="technical"
        )

    return Command(
        update={
            "category": "billing"
        },
        goto="billing"
    )
```

---

## 12.3 Why Type Annotation Matters

```python
Command[
    Literal[
        "technical",
        "billing"
    ]
]
```

This tells LangGraph which destinations the node may choose.

It also improves graph visualization and static understanding.

---

## 12.4 Conditional Edge vs Command

Use conditional edges when:

```text
Only routing is required
```

Use `Command` when:

```text
State must be updated
and
The next node must be selected
```

---

## 12.5 Navigate to Parent Graph

Inside a subgraph:

```python
return Command(
    update={
        "handoff_reason": (
            "Requires billing specialist"
        )
    },
    goto="billing_agent",
    graph=Command.PARENT
)
```

This pattern is useful for agent handoffs.

---

## 12.6 Resume an Interrupt

```python
graph.invoke(
    Command(
        resume="approved"
    ),
    config
)
```

`Command(resume=...)` supplies the value returned by `interrupt()` inside a paused node.

---

# Chapter 13: Send and Dynamic Parallelism

## 13.1 What Is Send?

`Send` dynamically schedules a node with custom input state.

It is useful for:

```text
Map-reduce
Parallel document processing
Parallel research tasks
Dynamic fan-out
Batch analysis
```

---

## 13.2 Map-Reduce Example

State:

```python
from operator import add


class OverallState(TypedDict):
    topics: list[str]

    summaries: Annotated[
        list[str],
        add
    ]

    final_summary: str
```

Worker state:

```python
class TopicState(TypedDict):
    topic: str
```

Worker:

```python
def summarize_topic(
    state: TopicState
):
    return {
        "summaries": [
            f"Summary of {state['topic']}"
        ]
    }
```

Fan-out:

```python
def create_workers(
    state: OverallState
):
    return [
        Send(
            "summarize_topic",
            {
                "topic": topic
            }
        )
        for topic in state["topics"]
    ]
```

Add:

```python
builder.add_conditional_edges(
    START,
    create_workers
)
```

Reduce:

```python
def combine_summaries(
    state: OverallState
):
    return {
        "final_summary": "\n".join(
            state["summaries"]
        )
    }
```

---

## 13.3 When to Use Send

Use `Send` when:

```text
The number of parallel tasks is known only at runtime

Each task needs custom input

Results can be merged using a reducer

Tasks are independent
```

Do not use it if:

```text
Tasks must run sequentially

Tasks modify the same external resource unsafely

Parallel execution would exceed rate limits
```

---

# Chapter 14: Building a Basic Chat Graph

## 14.1 Define Model

```python
from langchain_openai import (
    ChatOpenAI
)


model = ChatOpenAI(
    model="your-model-name",
    temperature=0
)
```

---

## 14.2 Model Node

```python
def call_model(
    state: MessagesState
):
    response = model.invoke(
        state["messages"]
    )

    return {
        "messages": [response]
    }
```

---

## 14.3 Build Graph

```python
builder = StateGraph(
    MessagesState
)

builder.add_node(
    "model",
    call_model
)

builder.add_edge(
    START,
    "model"
)

builder.add_edge(
    "model",
    END
)

graph = builder.compile()
```

Invoke:

```python
result = graph.invoke({
    "messages": [
        {
            "role": "user",
            "content": (
                "Explain LangGraph simply."
            )
        }
    ]
})

print(
    result["messages"][-1].content
)
```

---

# Chapter 15: Tool-Calling Graphs

## 15.1 Define Tools

```python
from langchain_core.tools import (
    tool
)


@tool
def multiply(
    first: int,
    second: int
) -> int:
    """Multiply two integers."""

    return first * second


@tool
def divide(
    numerator: float,
    denominator: float
) -> float:
    """Divide numerator by denominator."""

    if denominator == 0:
        raise ValueError(
            "Denominator cannot be zero."
        )

    return numerator / denominator
```

---

## 15.2 Bind Tools to Model

```python
tools = [
    multiply,
    divide
]

model_with_tools = model.bind_tools(
    tools
)
```

Binding tools tells the model which tool schemas are available.

It does not execute the tools itself.

---

## 15.3 Agent Node

```python
def call_agent(
    state: MessagesState
):
    response = model_with_tools.invoke(
        state["messages"]
    )

    return {
        "messages": [response]
    }
```

---

## 15.4 ToolNode

```python
tool_node = ToolNode(
    tools
)
```

`ToolNode` reads model-generated tool calls, executes the corresponding tools and returns tool messages. It is the standard tool-execution utility for custom LangGraph tool workflows.

---

## 15.5 Build Tool Loop

```python
builder = StateGraph(
    MessagesState
)

builder.add_node(
    "agent",
    call_agent
)

builder.add_node(
    "tools",
    tool_node
)

builder.add_edge(
    START,
    "agent"
)

builder.add_conditional_edges(
    "agent",
    tools_condition
)

builder.add_edge(
    "tools",
    "agent"
)

graph = builder.compile()
```

Flow:

```text
User
  ↓
Agent
  ↓
Tool requested?
 ↙          ↘
Yes          No
↓             ↓
Tools         END
↓
Agent
```

---

## 15.6 Manual Tool Router

```python
def should_continue(
    state: MessagesState
) -> Literal[
    "tools",
    END
]:
    latest_message = (
        state["messages"][-1]
    )

    if latest_message.tool_calls:
        return "tools"

    return END
```

Use:

```python
builder.add_conditional_edges(
    "agent",
    should_continue
)
```

---

## 15.7 ToolNode vs create_agent

Use `create_agent()` when:

```text
You need a standard tool-calling agent
No custom graph flow is necessary
You want middleware support quickly
```

Use `ToolNode` in LangGraph when:

```text
You need custom nodes before or after tools
Different tools need different routing
Tools require human approval
Tool execution is part of a larger workflow
```

---

# Chapter 16: Invocation and Execution Methods

## 16.1 Invoke

```python
result = graph.invoke(
    input_state
)
```

Runs synchronously and returns final state.

---

## 16.2 Async Invoke

```python
result = await graph.ainvoke(
    input_state
)
```

Use in:

```text
FastAPI
Async applications
Concurrent services
Network-heavy workflows
```

---

## 16.3 Batch

```python
results = graph.batch([
    {
        "query": "Question 1"
    },
    {
        "query": "Question 2"
    }
])
```

Use when inputs are independent.

---

## 16.4 Async Batch

```python
results = await graph.abatch(
    inputs
)
```

---

## 16.5 Configuration

```python
config = {
    "configurable": {
        "thread_id": "thread-123"
    },
    "tags": [
        "production"
    ],
    "metadata": {
        "user_id": "user-1"
    }
}
```

Invoke:

```python
result = graph.invoke(
    input_state,
    config=config
)
```

---

# Chapter 17: Runtime Context

## 17.1 State vs Runtime Context

State:

```text
Changes during workflow execution
May be checkpointed
Represents workflow data
```

Runtime context:

```text
Run-specific dependencies
Normally does not become graph state
Used for models, configuration and services
```

---

## 17.2 Define Context Schema

```python
from dataclasses import dataclass


@dataclass
class Context:
    user_id: str
    model_name: str
```

Create graph:

```python
builder = StateGraph(
    State,
    context_schema=Context
)
```

---

## 17.3 Access Context in Node

```python
from langgraph.runtime import (
    Runtime
)


def process(
    state: State,
    runtime: Runtime[Context]
):
    user_id = (
        runtime.context.user_id
    )

    return {
        "result": (
            f"Processed for {user_id}"
        )
    }
```

Invoke:

```python
graph.invoke(
    input_state,
    context={
        "user_id": "user-1",
        "model_name": "primary"
    }
)
```

Runtime context is intended for dependencies or run-specific information that should not live in mutable graph state.

---

## 17.4 What to Put in Context

Good examples:

```text
User ID
Tenant ID
Database client
Model selection
API client
Feature flags
Request-scoped settings
Authorization information
```

Avoid putting these in persistent state unless they are part of the workflow’s actual data.

---

# Chapter 18: Streaming

## 18.1 Why Stream?

Streaming lets users observe progress before the complete graph finishes.

You can stream:

```text
State updates
Full state values
LLM tokens
Custom progress
Checkpoints
Task events
Debug information
Subgraph events
```

LangGraph supports `stream()` and `astream()`. Current stream-mode output can use a unified v2 format; newer applications may also use the typed event-streaming interface.

---

## 18.2 Stream State Updates

```python
for chunk in graph.stream(
    input_state,
    stream_mode="updates",
    version="v2"
):
    print(chunk)
```

`updates` emits only the state changes produced by each node.

---

## 18.3 Stream Full State

```python
for chunk in graph.stream(
    input_state,
    stream_mode="values",
    version="v2"
):
    print(chunk)
```

`values` emits accumulated state snapshots.

---

## 18.4 Stream Multiple Modes

```python
for chunk in graph.stream(
    input_state,
    stream_mode=[
        "updates",
        "custom"
    ],
    version="v2"
):
    if chunk["type"] == "updates":
        print(
            "Update:",
            chunk["data"]
        )

    elif chunk["type"] == "custom":
        print(
            "Progress:",
            chunk["data"]
        )
```

---

## 18.5 Custom Progress Streaming

```python
from langgraph.config import (
    get_stream_writer
)


def research(
    state: State
):
    writer = get_stream_writer()

    writer({
        "status": (
            "Searching documents"
        )
    })

    documents = search_documents(
        state["query"]
    )

    writer({
        "status": (
            "Documents retrieved"
        )
    })

    return {
        "documents": documents
    }
```

---

## 18.6 Token Streaming

When an LLM is called inside a node, message-token events can be streamed.

Conceptually:

```python
for chunk in graph.stream(
    input_state,
    stream_mode="messages",
    version="v2"
):
    token, metadata = chunk["data"]

    print(
        token.content,
        end=""
    )
```

Exact model streaming support depends on the provider integration.

---

## 18.7 When to Use Each Mode

```text
updates:
Show what each node changed

values:
Inspect the full graph state over time

messages:
Stream LLM tokens and message events

custom:
Display progress from normal Python code

checkpoints:
Inspect persistence activity

tasks:
Inspect task start and completion

debug:
Receive detailed runtime information
```

---

# Chapter 19: Persistence

## 19.1 What Is Persistence?

Persistence stores workflow information beyond one function call.

LangGraph provides two major persistence mechanisms:

```text
Checkpointers
Stores
```

Checkpointers persist thread-scoped graph state. Stores hold application-defined data across threads.

---

## 19.2 Checkpointer

A checkpointer saves graph-state snapshots.

```python
from langgraph.checkpoint.memory import (
    InMemorySaver
)


checkpointer = InMemorySaver()

graph = builder.compile(
    checkpointer=checkpointer
)
```

---

## 19.3 Thread ID

```python
config = {
    "configurable": {
        "thread_id": "conversation-1"
    }
}
```

Invoke:

```python
graph.invoke(
    input_state,
    config
)
```

The same thread ID allows later executions to access the thread’s saved state.

---

## 19.4 Short-Term Memory Example

First request:

```python
graph.invoke(
    {
        "messages": [
            {
                "role": "user",
                "content": (
                    "My name is Aman."
                )
            }
        ]
    },
    config
)
```

Second request:

```python
result = graph.invoke(
    {
        "messages": [
            {
                "role": "user",
                "content": (
                    "What is my name?"
                )
            }
        ]
    },
    config
)
```

Because the thread state persists, the model can receive previous messages.

---

## 19.5 Checkpointer Options

Use in-memory persistence for:

```text
Development
Tests
Temporary demonstrations
```

Use SQLite for:

```text
Local persistence
Experiments
Single-instance applications
```

Use PostgreSQL or another production persistence backend for:

```text
Multi-instance applications
Long-running workflows
Production agents
Reliable recovery
```

The official persistence documentation distinguishes in-memory, SQLite and production-oriented database-backed checkpointers.

---

## 19.6 Checkpointer Capabilities

Checkpointers enable:

```text
Conversation memory
Human-in-the-loop
Fault recovery
Time travel
State inspection
State updates
Resuming paused workflows
```

---

# Chapter 20: Stores and Long-Term Memory

## 20.1 Checkpointer vs Store

Checkpointer:

```text
Stores graph-state snapshots
Scoped to a thread
Used for short-term workflow memory
```

Store:

```text
Stores application-defined data
Can be shared across threads
Used for long-term memory
```

---

## 20.2 InMemoryStore

```python
from langgraph.store.memory import (
    InMemoryStore
)


store = InMemoryStore()

graph = builder.compile(
    checkpointer=checkpointer,
    store=store
)
```

---

## 20.3 Memory Namespace

Long-term memory is commonly organized with namespaces.

```python
namespace = (
    "users",
    "user-123",
    "preferences"
)
```

Store:

```python
store.put(
    namespace,
    "language",
    {
        "value": "Python"
    }
)
```

Retrieve:

```python
item = store.get(
    namespace,
    "language"
)

print(
    item.value
)
```

---

## 20.4 Access Store in Nodes

A node can access the graph’s configured store through runtime.

```python
def remember_preference(
    state: State,
    runtime: Runtime
):
    namespace = (
        "users",
        state["user_id"],
        "preferences"
    )

    runtime.store.put(
        namespace,
        "language",
        {
            "value": (
                state["preferred_language"]
            )
        }
    )

    return {
        "saved": True
    }
```

---

## 20.5 What to Store Long-Term

Good long-term memories:

```text
Stable preferences
Confirmed profile information
Project decisions
Important recurring settings
User-specific facts
Shared organizational knowledge
```

Avoid storing:

```text
Every message
Unverified assumptions
Temporary details
Sensitive information without authorization
```

---

# Chapter 21: Interrupts and Human-in-the-Loop

## 21.1 What Is an Interrupt?

An interrupt pauses graph execution and waits for external input.

```text
Node executes
    ↓
interrupt()
    ↓
State saved
    ↓
Workflow pauses
    ↓
Human responds
    ↓
Workflow resumes
```

Interrupts require a checkpointer because the graph state must be persisted while execution is paused.

---

## 21.2 Basic Interrupt

```python
from langgraph.types import (
    interrupt
)


def request_approval(
    state: State
):
    decision = interrupt({
        "action": "send_email",
        "recipient": state["recipient"],
        "body": state["email_body"],
        "message": (
            "Approve sending this email?"
        )
    })

    return {
        "approved": (
            decision == "approve"
        )
    }
```

---

## 21.3 Compile with Checkpointer

```python
graph = builder.compile(
    checkpointer=InMemorySaver()
)
```

Config:

```python
config = {
    "configurable": {
        "thread_id": "approval-1"
    }
}
```

First run:

```python
result = graph.invoke(
    input_state,
    config
)
```

The graph pauses at `interrupt()`.

---

## 21.4 Resume

```python
result = graph.invoke(
    Command(
        resume="approve"
    ),
    config
)
```

The value `"approve"` becomes the return value of `interrupt()`.

---

## 21.5 Approval Decisions

Possible decisions:

```text
Approve
Reject
Edit
Request more information
Escalate
```

You may return structured input:

```python
Command(
    resume={
        "decision": "edit",
        "new_body": "Updated email body"
    }
)
```

---

## 21.6 When to Use Human Approval

Use before:

```text
Sending emails
Deleting records
Executing database writes
Transferring funds
Publishing content
Changing infrastructure
Issuing refunds
Submitting legal documents
```

---

## 21.7 Interrupt Re-Execution Rule

When a paused workflow resumes, the node containing `interrupt()` starts again from the beginning.

Therefore:

```text
Code before interrupt may execute again
```

Unsafe:

```python
def approval_node(state):
    send_email_draft_to_database()

    decision = interrupt(
        "Approve?"
    )
```

Safer:

```python
def approval_node(state):
    decision = interrupt(
        "Approve?"
    )

    if decision == "approve":
        save_with_idempotency_key()
```

Side effects before interrupts must be idempotent.

---

# Chapter 22: Durable Execution and Tasks

## 22.1 What Is Durable Execution?

Durable execution allows workflows to continue after:

```text
Application restart
Temporary failure
Human interruption
Long waiting period
Process crash
```

Completed progress is saved so the entire workflow does not need to restart.

---

## 22.2 Node Re-Execution

Checkpoints are saved at graph execution boundaries.

If a node fails halfway through, the node may restart from its beginning.

For complex nodes, individual operations can be wrapped as checkpointed tasks.

---

## 22.3 Task Decorator

```python
from langgraph.func import (
    task
)


@task
def call_external_api(
    query: str
):
    return external_api_call(
        query
    )
```

Inside node:

```python
def research_node(
    state: State
):
    future = call_external_api(
        state["query"]
    )

    result = future.result()

    return {
        "research": result
    }
```

If the workflow resumes, completed task results can be reused rather than recomputed.

---

## 22.4 Parallel Tasks

```python
def research_node(
    state: State
):
    futures = [
        call_external_api(query)
        for query in state["queries"]
    ]

    results = [
        future.result()
        for future in futures
    ]

    return {
        "results": results
    }
```

---

## 22.5 Idempotency

An operation is idempotent if repeating it produces the same intended result.

Safe:

```text
Upsert record with fixed key
Set status to approved
Store result by request ID
```

Unsafe without protection:

```text
Insert new row every execution
Charge credit card
Send duplicate email
Increment balance
```

Use:

```text
Operation IDs
Request IDs
Database uniqueness constraints
Transaction logs
Deduplication tables
```

---

# Chapter 23: Fault Tolerance and Retries

## 23.1 Types of Failure

```text
Transient API failure
Rate limit
Network timeout
Invalid input
Authentication failure
Model output error
Database conflict
Tool exception
```

Not every error should be retried.

---

## 23.2 Retry Policy

Conceptual node configuration:

```python
from langgraph.types import (
    RetryPolicy
)


builder.add_node(
    "external_api",
    call_external_api_node,
    retry_policy=RetryPolicy(
        max_attempts=3
    )
)
```

Use retries for:

```text
Temporary network errors
Rate limits
Service unavailable errors
Transient timeouts
```

Avoid retries for:

```text
Invalid credentials
Permission denied
Invalid schema
Business-rule failure
Permanent missing data
```

---

## 23.3 Pending Writes

When parallel nodes run in the same super-step and one fails, successful node writes may already be persisted.

On resume, the successful nodes may not need to run again.

This reduces unnecessary repeated work.

---

## 23.4 Error State

You may store error information:

```python
class State(TypedDict):
    result: str | None
    error: str | None
    retry_count: int
```

Node:

```python
def safe_operation(
    state: State
):
    try:
        result = risky_operation()

        return {
            "result": result,
            "error": None
        }

    except ValueError as error:
        return {
            "error": str(error)
        }
```

Route:

```python
def route_error(
    state: State
) -> Literal[
    "recover",
    "continue"
]:
    if state["error"]:
        return "recover"

    return "continue"
```

---

# Chapter 24: Node Caching

## 24.1 Why Cache Nodes?

Caching avoids recomputing expensive deterministic node results.

Useful for:

```text
Expensive API calls
Document parsing
Static summarization
Deterministic calculations
Repeated retrieval
```

---

## 24.2 Configure Cache

```python
from langgraph.cache.memory import (
    InMemoryCache
)

from langgraph.types import (
    CachePolicy
)


builder.add_node(
    "expensive_node",
    expensive_node,
    cache_policy=CachePolicy(
        ttl=300
    )
)

graph = builder.compile(
    cache=InMemoryCache()
)
```

LangGraph caching is configured using a graph cache and per-node cache policies.

---

## 24.3 When Not to Cache

Avoid caching when:

```text
Data changes frequently
Output depends on current time
Output is user-specific
Permissions affect results
The function has side effects
```

---

## 24.4 Cache vs Checkpointer

Cache:

```text
Avoids repeated computation
Keyed by node input
```

Checkpointer:

```text
Stores workflow progress
Keyed by thread and checkpoint
```

They solve different problems.

---

# Chapter 25: State Inspection

## 25.1 Get Current State

```python
snapshot = graph.get_state(
    config
)

print(
    snapshot.values
)

print(
    snapshot.next
)
```

---

## 25.2 State Snapshot

A state snapshot may include:

```text
Current values
Next nodes
Configuration
Metadata
Created time
Tasks
Parent checkpoint
```

---

## 25.3 State History

```python
history = list(
    graph.get_state_history(
        config
    )
)

for snapshot in history:
    print(
        snapshot.values,
        snapshot.next
    )
```

History is useful for:

```text
Debugging
Audit trails
Time travel
Understanding routing
Inspecting previous node results
```

---

## 25.4 Update State

```python
new_config = graph.update_state(
    config,
    values={
        "approved": True
    }
)
```

State updates pass through reducers.

You may specify which node should be treated as having created the update:

```python
new_config = graph.update_state(
    config,
    values={
        "category": "technical"
    },
    as_node="classify"
)
```

---

# Chapter 26: Time Travel

## 26.1 What Is Time Travel?

Time travel allows you to:

```text
Replay from an earlier checkpoint
Fork a previous execution
Modify past state
Explore alternative paths
Debug failures
```

LangGraph time travel operates through saved checkpoints. Replay re-executes later nodes, while forking creates a new checkpoint branch with modified state.

---

## 26.2 Replay

```python
history = list(
    graph.get_state_history(
        config
    )
)

checkpoint = history[2]

result = graph.invoke(
    None,
    checkpoint.config
)
```

Nodes after the selected checkpoint execute again.

Nodes before it do not.

---

## 26.3 Fork

```python
fork_config = graph.update_state(
    checkpoint.config,
    values={
        "topic": "new topic"
    }
)

result = graph.invoke(
    None,
    fork_config
)
```

The original execution remains available.

A new branch is created.

---

## 26.4 Use Cases

```text
Try a different human decision
Correct an incorrect classification
Rerun generation with new state
Debug a failed tool result
Compare alternative workflow paths
```

---

# Chapter 27: Subgraphs

## 27.1 What Is a Subgraph?

A subgraph is a compiled graph used inside another graph as a node.

```text
Parent graph
   │
   ├── Node A
   │
   ├── Research subgraph
   │      ├── Search
   │      ├── Evaluate
   │      └── Summarize
   │
   └── Node B
```

Subgraphs improve modularity and are useful for multi-agent and reusable workflow design.

---

## 27.2 Build Subgraph

```python
class ResearchState(TypedDict):
    query: str
    sources: list[str]
    summary: str


research_builder = StateGraph(
    ResearchState
)

research_builder.add_node(
    "search",
    search_node
)

research_builder.add_node(
    "summarize",
    summarize_node
)

research_builder.add_edge(
    START,
    "search"
)

research_builder.add_edge(
    "search",
    "summarize"
)

research_builder.add_edge(
    "summarize",
    END
)

research_graph = (
    research_builder.compile()
)
```

---

## 27.3 Add to Parent

```python
parent_builder.add_node(
    "research",
    research_graph
)
```

If parent and child use compatible state keys, the subgraph can often be inserted directly.

---

## 27.4 Different State Schemas

If schemas differ, create a wrapper node:

```python
def run_research(
    state: ParentState
):
    result = research_graph.invoke({
        "query": state["question"],
        "sources": [],
        "summary": ""
    })

    return {
        "research_summary": (
            result["summary"]
        )
    }
```

---

## 27.5 Subgraph Persistence

By default, a stateful subgraph can inherit its parent’s checkpointer.

Use:

```python
subgraph = (
    subgraph_builder.compile()
)
```

For separate internal checkpoint history:

```python
subgraph = (
    subgraph_builder.compile(
        checkpointer=True
    )
)
```

A subgraph with its own checkpointing supports more granular state inspection and time travel within the subgraph.

---

## 27.6 When to Use Subgraphs

Use subgraphs for:

```text
Reusable workflow components
Specialized agents
Independent state machines
Complex nested processes
Separating team responsibilities
Testing workflow sections independently
```

---

# Chapter 28: Functional API

## 28.1 What Is the Functional API?

LangGraph provides two main programming styles:

```text
Graph API
Functional API
```

The Functional API allows you to write workflows using normal Python control flow.

It uses:

```python
@entrypoint
@task
```

The Graph API makes state and topology explicit, while the Functional API reduces graph boilerplate and uses standard Python constructs.

---

## 28.2 Basic Functional Workflow

```python
from langgraph.func import (
    entrypoint,
    task
)


@task
def research(
    topic: str
) -> str:
    return (
        f"Research about {topic}"
    )


@task
def write_report(
    research_result: str
) -> str:
    return (
        f"Report based on "
        f"{research_result}"
    )


@entrypoint()
def workflow(
    topic: str
):
    research_result = (
        research(topic).result()
    )

    report = write_report(
        research_result
    ).result()

    return report
```

Invoke:

```python
result = workflow.invoke(
    "LangGraph"
)
```

---

## 28.3 Add Checkpointer

```python
@entrypoint(
    checkpointer=InMemorySaver()
)
def workflow(
    topic: str
):
    ...
```

---

## 28.4 Interrupt in Functional API

```python
@entrypoint(
    checkpointer=InMemorySaver()
)
def workflow(
    topic: str
):
    report = create_report(
        topic
    ).result()

    approved = interrupt({
        "report": report,
        "action": (
            "Approve this report?"
        )
    })

    return {
        "report": report,
        "approved": approved
    }
```

Resume:

```python
workflow.invoke(
    Command(
        resume=True
    ),
    config
)
```

---

## 28.5 Graph API vs Functional API

Use Graph API when:

```text
Graph visualization matters
State is shared across many nodes
Routing is complex
Subgraphs are important
You want explicit nodes and edges
```

Use Functional API when:

```text
Workflow resembles normal Python code
Control flow is easier with loops and conditions
You want fewer schema and reducer definitions
Tasks are the main durable units
```

---

# Chapter 29: RAG with LangGraph

## 29.1 Why Use LangGraph for RAG?

A basic RAG chain is:

```text
Retrieve
   ↓
Generate
```

A more advanced RAG workflow may need:

```text
Query classification
Query rewriting
Document retrieval
Document grading
Web search fallback
Answer generation
Answer evaluation
Retry
```

---

## 29.2 RAG State

```python
class RAGState(TypedDict):
    question: str
    rewritten_query: str
    documents: list[str]
    answer: str
    grounded: bool
    attempts: int
```

---

## 29.3 Typical RAG Graph

```text
START
  ↓
Classify question
  ↓
Rewrite query
  ↓
Retrieve documents
  ↓
Grade documents
  ↓
Relevant?
 ↙        ↘
No         Yes
↓           ↓
Web search  Generate answer
     \       /
      ↓     ↓
      Evaluate answer
           ↓
      Grounded?
       ↙     ↘
      No      Yes
      ↓        ↓
   Retrieve    END
   again
```

---

## 29.4 Retrieval Node

```python
def retrieve(
    state: RAGState
):
    documents = retriever.invoke(
        state["rewritten_query"]
    )

    return {
        "documents": documents
    }
```

---

## 29.5 Document Grading Node

```python
def grade_documents(
    state: RAGState
):
    relevant_documents = []

    for document in state["documents"]:
        if is_relevant(
            state["question"],
            document
        ):
            relevant_documents.append(
                document
            )

    return {
        "documents": relevant_documents
    }
```

---

## 29.6 Route After Grading

```python
def route_documents(
    state: RAGState
) -> Literal[
    "generate",
    "web_search"
]:
    if state["documents"]:
        return "generate"

    return "web_search"
```

---

## 29.7 Answer Evaluation

```python
def evaluate_answer(
    state: RAGState
):
    grounded = check_grounding(
        answer=state["answer"],
        documents=state["documents"]
    )

    return {
        "grounded": grounded,
        "attempts": (
            state["attempts"] + 1
        )
    }
```

---

## 29.8 When LangGraph RAG Is Useful

Use it when:

```text
Retrieval sometimes fails
Queries require rewriting
Several data sources exist
Retrieved documents need filtering
Answers require validation
Fallback search is needed
```

For a simple retrieve-and-answer flow, a normal LangChain RAG chain may be easier.

---

# Chapter 30: Multi-Agent Systems

## 30.1 What Is a Multi-Agent Graph?

A multi-agent graph contains several specialized agents.

```text
Supervisor
   ├── Research agent
   ├── Coding agent
   ├── SQL agent
   └── Writing agent
```

---

## 30.2 Supervisor Pattern

```text
User request
     ↓
Supervisor
     ↓
Select agent
 ┌────┼─────┐
 ↓    ↓     ↓
SQL Research Writer
 └────┼─────┘
      ↓
Supervisor
      ↓
Final response
```

---

## 30.3 Multi-Agent State

```python
class MultiAgentState(MessagesState):
    next_agent: str
    research_result: str
    sql_result: str
    final_answer: str
```

---

## 30.4 Supervisor Router

```python
def supervisor(
    state: MultiAgentState
) -> Command[
    Literal[
        "research_agent",
        "sql_agent",
        "writer",
        END
    ]
]:
    decision = choose_agent(
        state["messages"]
    )

    return Command(
        update={
            "next_agent": decision
        },
        goto=decision
    )
```

---

## 30.5 Handoff Pattern

A specialist can hand control to another agent:

```python
return Command(
    update={
        "handoff_reason": (
            "Database access required"
        )
    },
    goto="sql_agent",
    graph=Command.PARENT
)
```

---

## 30.6 When to Use Multiple Agents

Use several agents when:

```text
Agents need different tools
Prompts are highly specialized
Context should be isolated
Permissions differ
Tasks have separate responsibilities
```

Do not use multi-agent architecture when one agent with a few tools is sufficient.

---

# Chapter 31: Testing LangGraph

## 31.1 Test Nodes Independently

```python
def test_calculate_total():
    state = {
        "values": [1, 2, 3],
        "total": 0
    }

    update = calculate_total(
        state
    )

    assert update["total"] == 6
```

---

## 31.2 Test Routing

```python
def test_route_technical():
    state = {
        "category": "technical"
    }

    assert (
        route_request(state)
        == "technical"
    )
```

---

## 31.3 Test Reducers

```python
def test_merge_unique():
    current = [
        "a",
        "b"
    ]

    update = [
        "b",
        "c"
    ]

    result = merge_unique(
        current,
        update
    )

    assert result == [
        "a",
        "b",
        "c"
    ]
```

---

## 31.4 Test Complete Graph

```python
def test_graph():
    result = graph.invoke({
        "message": "hello",
        "result": ""
    })

    assert (
        result["result"]
        == "HELLO"
    )
```

---

## 31.5 Test with Checkpointer

```python
def test_memory():
    config = {
        "configurable": {
            "thread_id": "test-thread"
        }
    }

    graph.invoke(
        first_input,
        config
    )

    result = graph.invoke(
        second_input,
        config
    )

    assert expected_value in result
```

---

## 31.6 Test Interrupts

Test:

```text
Graph pauses
Interrupt payload is correct
Approval resumes correctly
Rejection routes correctly
Side effects are not duplicated
```

---

## 31.7 Mock External Components

Mock:

```text
LLMs
Database calls
Web APIs
Email systems
Vector stores
Payment services
```

Use real external systems only in integration or end-to-end tests.

The official testing guidance emphasizes constructing graphs with test-specific dependencies and testing components at appropriate boundaries.

---

# Chapter 32: Visualization and Debugging

## 32.1 Display Graph Structure

```python
print(
    graph.get_graph()
)
```

Mermaid syntax:

```python
print(
    graph.get_graph()
         .draw_mermaid()
)
```

In a notebook:

```python
from IPython.display import (
    Image,
    display
)


display(
    Image(
        graph.get_graph()
             .draw_mermaid_png()
    )
)
```

---

## 32.2 Why Visualize?

Graph visualization helps identify:

```text
Unexpected branches
Missing END routes
Accidental loops
Disconnected nodes
Parallel execution
Subgraph structure
```

---

## 32.3 LangSmith Tracing

Enable environment variables:

```text
LANGSMITH_TRACING=true
LANGSMITH_API_KEY=your-key
LANGSMITH_PROJECT=my-langgraph-project
```

Tracing shows:

```text
Node inputs
Node outputs
Model calls
Tool calls
Latency
Token usage
Errors
Execution path
```

---

# Chapter 33: Production Architecture

## 33.1 Separate Pure Logic from Side Effects

Pure logic node:

```python
def classify_request(
    state: State
):
    ...
```

Side-effect node:

```python
def send_email(
    state: State
):
    ...
```

Keeping these separate improves:

```text
Testing
Retries
Approval
Auditability
Recovery
```

---

## 33.2 State Design Principles

Good state:

```text
Small
Serializable
Clearly typed
Meaningful
Free of duplicated data
```

Poor state:

```text
Contains model clients
Contains database connections
Contains huge repeated documents
Contains unvalidated arbitrary objects
```

---

## 33.3 Limit Graph Growth

Control:

```text
Maximum steps
Maximum tool calls
Maximum retries
Maximum documents
Maximum token usage
Maximum execution time
```

---

## 33.4 Use Persistent Checkpointers

Do not use in-memory persistence for important production workflows.

A process restart would lose in-memory state.

Use a durable database-backed checkpointer.

---

## 33.5 Authorization

Do not rely on an LLM to decide permissions.

Check authorization in code before:

```text
Reading private data
Writing records
Sending emails
Executing SQL
Accessing tenant documents
Calling privileged tools
```

---

## 33.6 Tenant Isolation

Use tenant or organization IDs in:

```text
Retriever filters
Store namespaces
Database queries
Tool validation
Runtime context
```

---

## 33.7 Human Approval

Place human approval before irreversible actions.

```text
Generate proposal
      ↓
Human approval
      ↓
Execute side effect
```

Not:

```text
Execute side effect
      ↓
Ask whether it was acceptable
```

---

# Chapter 34: Common Mistakes

## 34.1 Returning the Entire State from Every Node

Unnecessary:

```python
return {
    "query": state["query"],
    "documents": state["documents"],
    "answer": answer
}
```

Better:

```python
return {
    "answer": answer
}
```

Return only updates.

---

## 34.2 Forgetting Reducers

Parallel nodes writing to the same list require a reducer.

Without one, state updates may conflict or replace each other.

---

## 34.3 Storing Formatted Prompt Text in State

Prefer storing:

```text
Raw query
Documents
Structured analysis
```

Generate formatted prompts only when calling the model.

---

## 34.4 Using LLMs for Deterministic Logic

Do not use an LLM to decide:

```text
Whether a number is negative
Whether a user has permission
Whether a fixed enum value is valid
How to calculate a total
```

Use Python.

---

## 34.5 Infinite Loops

Always define:

```text
Iteration counter
Maximum recursion limit
Stopping condition
Failure exit
```

---

## 34.6 Side Effects Before Interrupt

Because the node may re-run, side effects before `interrupt()` can repeat.

Move effects after approval or make them idempotent.

---

## 34.7 Mixing Static and Dynamic Routing

If a node has both:

```python
builder.add_edge(
    "node",
    "static_destination"
)
```

and returns:

```python
Command(
    goto="dynamic_destination"
)
```

both paths may run.

Use one routing method per node unless parallel routing is intentional.

---

## 34.8 Using One Large Node

A giant node hides:

```text
Progress
Intermediate state
Failure location
Retry boundaries
Approval points
```

Split it into meaningful stages.

---

## 34.9 Storing Long-Term Memory in Thread State

Thread state is for short-term workflow context.

Use a store for cross-thread memory.

---

## 34.10 Using LangGraph for a One-Step Workflow

Do not add graph complexity unless the use case needs orchestration.

---

# Chapter 35: When to Use What

## Normal Edge

Use when:

```text
The next node is always known.
```

---

## Conditional Edge

Use when:

```text
The next node depends on current state.
No state update is needed during routing.
```

---

## Command

Use when:

```text
A node must update state and select the next node.
```

---

## Send

Use when:

```text
A dynamic number of parallel tasks must be created.
```

---

## Reducer

Use when:

```text
Several updates must be accumulated or merged.
```

---

## MessagesState

Use when:

```text
The graph contains a conversational message history.
```

---

## Checkpointer

Use when:

```text
Thread state must persist.
The graph must pause, resume or recover.
```

---

## Store

Use when:

```text
Information must persist across threads.
```

---

## Interrupt

Use when:

```text
External or human input is required before continuing.
```

---

## Subgraph

Use when:

```text
A workflow section is complex, reusable or independently stateful.
```

---

## Functional API

Use when:

```text
Normal Python control flow is clearer than an explicit graph.
```

---

## Graph API

Use when:

```text
Explicit state, nodes, routing and visualization are important.
```

---

## ToolNode

Use when:

```text
A custom graph needs to execute model-generated tool calls.
```

---

## LangChain create_agent()

Use when:

```text
A standard model-tool loop is sufficient.
```

---

# Chapter 36: Recommended Learning Roadmap

## Phase 1: Basic Graphs

Learn:

```text
State
Nodes
Edges
START
END
Compilation
Invocation
```

Build:

```text
Text-processing graph
Simple classification router
Sequential data pipeline
```

---

## Phase 2: State Management

Learn:

```text
TypedDict
MessagesState
Reducers
Parallel updates
Input and output schemas
```

Build:

```text
Multi-step report generator
Parallel document summarizer
```

---

## Phase 3: Conditional Workflows

Learn:

```text
Conditional edges
Loops
Command
Send
Recursion limits
```

Build:

```text
Content generation and review loop
Dynamic map-reduce workflow
```

---

## Phase 4: Agents and Tools

Learn:

```text
Tool binding
ToolNode
tools_condition
Model-tool loops
Tool errors
```

Build:

```text
Calculator agent
Database-read agent
Research agent
```

---

## Phase 5: Persistence

Learn:

```text
Checkpointers
Thread IDs
Stores
State inspection
State history
Time travel
```

Build:

```text
Persistent chatbot
Long-running research assistant
```

---

## Phase 6: Human-in-the-Loop

Learn:

```text
interrupt()
Command(resume=...)
Approval workflows
Idempotent side effects
```

Build:

```text
Email approval agent
SQL write approval agent
Refund approval workflow
```

---

## Phase 7: Advanced Architecture

Learn:

```text
Subgraphs
Multi-agent systems
Runtime context
Functional API
Custom streaming
```

Build:

```text
Supervisor multi-agent system
Agentic RAG
Incident-response graph
```

---

## Phase 8: Production

Learn:

```text
Retries
Fault tolerance
Caching
Testing
LangSmith tracing
Persistent storage
Authorization
Deployment
```

---

# Chapter 37: Suggested Projects

## Beginner

```text
Query classification graph
Text summarization pipeline
Conditional FAQ assistant
Simple tool-calling calculator
```

## Intermediate

```text
PDF RAG workflow
Persistent customer-support assistant
Human-approved email agent
Content generation and reviewer graph
```

## Advanced

```text
Agentic RAG system
Multi-agent research assistant
SQL agent with approval
Incident-response orchestration
Long-running coding agent
Enterprise knowledge assistant
```

---

# Chapter 38: Complete Example

## 38.1 Stateful Tool-Calling Agent with Memory

```python
from langchain_core.tools import (
    tool
)

from langchain_openai import (
    ChatOpenAI
)

from langgraph.checkpoint.memory import (
    InMemorySaver
)

from langgraph.graph import (
    StateGraph,
    MessagesState,
    START
)

from langgraph.prebuilt import (
    ToolNode,
    tools_condition
)


@tool
def multiply(
    first: int,
    second: int
) -> int:
    """Multiply two integers."""

    return first * second


@tool
def get_user_plan(
    user_id: str
) -> str:
    """Return the subscription plan for a user."""

    plans = {
        "u1": "Pro",
        "u2": "Free"
    }

    return plans.get(
        user_id,
        "Unknown"
    )


tools = [
    multiply,
    get_user_plan
]


model = ChatOpenAI(
    model="your-model-name",
    temperature=0
).bind_tools(
    tools
)


def call_model(
    state: MessagesState
):
    response = model.invoke(
        state["messages"]
    )

    return {
        "messages": [response]
    }


builder = StateGraph(
    MessagesState
)

builder.add_node(
    "agent",
    call_model
)

builder.add_node(
    "tools",
    ToolNode(tools)
)

builder.add_edge(
    START,
    "agent"
)

builder.add_conditional_edges(
    "agent",
    tools_condition
)

builder.add_edge(
    "tools",
    "agent"
)


graph = builder.compile(
    checkpointer=InMemorySaver()
)


config = {
    "configurable": {
        "thread_id": "user-session-1"
    }
}


result = graph.invoke(
    {
        "messages": [
            {
                "role": "user",
                "content": (
                    "Multiply 12 by 8."
                )
            }
        ]
    },
    config
)


print(
    result["messages"][-1].content
)
```

---

# Final Concept Summary

LangGraph models an application using:

```text
State
Nodes
Edges
```

State answers:

```text
What does the workflow currently know?
```

Nodes answer:

```text
What work should be performed?
```

Edges answer:

```text
What should happen next?
```

Reducers answer:

```text
How should multiple updates be combined?
```

`Command` answers:

```text
How can a node update state and control routing together?
```

`Send` answers:

```text
How can dynamic parallel tasks be created?
```

Checkpointers answer:

```text
How can thread progress be saved and resumed?
```

Stores answer:

```text
How can information persist across threads?
```

Interrupts answer:

```text
How can execution pause for external or human input?
```

Subgraphs answer:

```text
How can a large workflow be divided into reusable components?
```

The most important LangGraph design principle is:

```text
Use deterministic code for known logic
and
Use models only where language understanding or reasoning is required.
```

A good LangGraph application should be:

```text
Explicit
Modular
State-aware
Testable
Observable
Recoverable
Secure
```

Start with the smallest workable graph, then add persistence, tools, loops, human approval or multi-agent coordination only when the use case genuinely requires them.
