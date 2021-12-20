import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  width: 80vw;
  gap: 30px;
  margin-bottom: 100px;
  div:nth-child(1) {
    transform-origin: right bottom;
  }
  div:nth-child(2) {
    transform-origin: left bottom;
  }
  div:nth-child(3) {
    transform-origin: right top;
  }
  div:nth-child(4) {
    transform-origin: left top;
  }
`;

const Box = styled(motion.div)`
  height: 30vh;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 40px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Circle = styled(motion.div)`
  height: 150px;
  width: 150px;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 75px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const Overlay = styled(motion.div)`
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Button = styled(motion.button)`
  background-color: white;
  font-size: 100px;
  padding: 20px;
  border-radius: 30px;
  border: solid black 5px;
`;

const overlay = {
  hidden: { backgroundColor: "rgba(0,0,0,0" },
  visible: { backgroundColor: "rgba(0,0,0,0.5" },
  exit: { backgroundColor: "rgba(0,0,0,0" },
};

const scale = {
  boxA: {
    scale: 1.1,
    transition: { duration: 0.2 },
    originX: 1,
    originY: 1,
  },
  boxB: {
    scale: 1.1,
    transition: { duration: 0.2 },
    originX: 0,
    originY: 1,
  },
  boxC: {
    scale: 1.1,
    transition: { duration: 0.2 },
    originX: 1,
    originY: 0,
  },
  boxD: {
    scale: 1.1,
    transition: { duration: 0.2 },
    originX: 0,
    originY: 0,
  },
};

function App() {
  const data = ["boxA", "boxB", "boxC", "boxD"];
  const [id, setId] = useState<null | string>(null);
  const [box, setBox] = useState<null | string>("boxA");
  function randomValue(array: string[]) {
    const random = Math.floor(Math.random() * array.length);
    return array[random];
  }
  return (
    <Wrapper>
      <Grid>
        {data.map((n) => (
          <Box
            variants={scale}
            whileHover={n}
            onClick={() => setId(n)}
            key={n}
            layoutId={n}
          >
            {box === n ? <Circle layoutId="circle" /> : null}
          </Box>
        ))}
      </Grid>
      <AnimatePresence>
        {id ? (
          <Overlay
            variants={overlay}
            onClick={() => setId(null)}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <Box
              layoutId={id}
              style={{
                width: "50vw",
                height: "50vh",
                backgroundColor: "rgba(255, 255, 255, 1)",
              }}
            />
          </Overlay>
        ) : null}
      </AnimatePresence>
      <Button onClick={() => setBox(randomValue(data))}>Switch</Button>
    </Wrapper>
  );
}

export default App;
