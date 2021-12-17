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
`;

const Overlay = styled(motion.div)`
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Button = styled(motion.div)`
  background-color:
  font-size: 100px;
`;

const overlay = {
  hidden: { backgroundColor: "rgba(0,0,0,0" },
  visible: { backgroundColor: "rgba(0,0,0,0.5" },
  exit: { backgroundColor: "rgba(0,0,0,0" },
};

function App() {
  const [id, setId] = useState<null | string>(null);
  return (
    <Wrapper>
      <Grid>
        {["1", "2", "3", "4"].map((n) => (
          <Box
            whileHover={{ scale: 1.3, transition: { duration: 0.5 } }}
            onClick={() => setId(n)}
            key={n}
            layoutId={n}
          />
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
      <Button>Switch</Button>
    </Wrapper>
  );
}

export default App;
