import { Container, Box, Stack, TextField, MenuItem, Card } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useForm } from 'react-hook-form';
import MuiForm from './MuiForm';

export default function UiSample() {
  return (
    <div>
      <div>
        <h1>Box/Grid</h1>
        <div>
          <Container>
            <Box component="div">
              <Grid container sx={{ backgroundColor: 'red' }} spacing={2}>
                <Grid size={{ xs: 12, md: 6 }} sx={{ backgroundColor: 'lightblue' }}>
                  grid1
                </Grid>
                <Grid size={{ xs: 12, md: 6 }} sx={{ backgroundColor: 'blue' }}>
                  grid2
                </Grid>
              </Grid>
              <Grid container sx={{ backgroundColor: 'yellow' }} spacing={2}>
                <Grid size={{ xs: 12, md: 6 }} sx={{ backgroundColor: 'lightblue' }}>
                  grid3
                </Grid>
                <Grid size={{ xs: 12, md: 6 }} sx={{ backgroundColor: 'blue' }}>
                  grid4
                </Grid>
              </Grid>
            </Box>
          </Container>

          <Container>
            <Grid container sx={{ backgroundColor: 'red' }} spacing={2}>
              <Grid size={{ xs: 8, md: 4 }} sx={{ backgroundColor: 'lightblue' }}>
                grid1-1
              </Grid>
              <Grid size={{ xs: 8, md: 4 }} sx={{ backgroundColor: 'blue' }}>
                grid1-2
              </Grid>
            </Grid>
            <Grid
              container
              display="flex"
              justifyContent="center"
              sx={{ backgroundColor: 'yellow' }}
              spacing={2}
            >
              <Grid size={{ xs: 8, md: 4 }} sx={{ backgroundColor: 'lightblue' }}>
                grid1-1
              </Grid>
              <Grid size={{ xs: 8, md: 4 }} sx={{ backgroundColor: 'blue' }}>
                grid1-2
              </Grid>
            </Grid>
            <Grid
              container
              display="flex"
              justifyContent="center"
              sx={{ backgroundColor: 'gray' }}
              spacing={2}
            >
              <Grid
                display="flex"
                justifyContent="center"
                size={{ xs: 6, md: 3 }}
                sx={{ backgroundColor: 'lightblue' }}
              >
                grid2-1
              </Grid>
              <Grid
                display="flex"
                justifyContent="center"
                size={{ xs: 6, md: 3 }}
                sx={{ backgroundColor: 'blue' }}
              >
                grid2-2
              </Grid>
            </Grid>
          </Container>
          <Container>
            <Grid container>
              <Grid>
                <Grid container rowSpacing={30} columnSpacing={30}>
                  <Grid size={{ xs: 12, md: 6 }}>grid1-1</Grid>
                  <Grid size={{ xs: 12, md: 6 }}>grid1-2</Grid>
                </Grid>
                <Grid container>
                  <Grid size={{ xs: 12, md: 6 }}>grid2-1</Grid>
                  <Grid size={{ xs: 12, md: 6 }}>grid2-2</Grid>
                </Grid>
              </Grid>
            </Grid>
          </Container>
        </div>
        <hr />
        <div>
          <MuiForm />
        </div>
        <hr />
        <div>
          <Container maxWidth="md" sx={{ mt: 3, mb: 3 }}>
            <Stack spacing={2}>
              <Grid container spacing={2}>
                <Grid size={{ xs: 8, md: 8 }}>
                  <Stack spacing={2}>
                    <TextField id="氏名" label="氏名" variant="filled" />
                    <TextField
                      fullWidth
                      size="medium"
                      id="生年月日"
                      label="生年月日"
                      variant="filled"
                      type="date"
                      slotProps={{ inputLabel: { shrink: true } }}
                    />
                    <Grid container spacing={2}>
                      <Grid size={{ xs: 6, md: 6 }}>
                        <TextField
                          fullWidth
                          size="medium"
                          id="年齢"
                          label="年齢"
                          variant="filled"
                          type="number"
                        />
                      </Grid>
                      <Grid size={{ xs: 6, md: 6 }}>
                        <TextField
                          select
                          fullWidth
                          size="medium"
                          id="性別"
                          label="性別"
                          variant="filled"
                        >
                          <MenuItem value={1}>男性</MenuItem>
                          <MenuItem value={2}>女性</MenuItem>
                          <MenuItem value={3}>その他</MenuItem>
                        </TextField>
                      </Grid>
                    </Grid>
                    <TextField
                      fullWidth
                      size="medium"
                      id="最終学歴"
                      label="最終学歴"
                      variant="filled"
                    />
                  </Stack>
                </Grid>
                <Grid size={{ xs: 4, md: 4 }}>
                  <Card sx={{ bgcolor: '#555555', width: '100%', aspectRatio: '1 / 1' }} />
                </Grid>
              </Grid>
              <TextField
                fullWidth
                multiline
                maxRows={4}
                size="medium"
                id="プログラミングの経験・使用言語"
                label="プログラミングの経験・使用言語"
                variant="filled"
              />
              <TextField
                fullWidth
                multiline
                maxRows={4}
                size="medium"
                id="自己PR"
                label="自己PR"
                variant="filled"
              />
              <TextField
                fullWidth
                multiline
                maxRows={4}
                size="medium"
                id="研究成果"
                label="研究成果"
                variant="filled"
              />
              <TextField
                fullWidth
                multiline
                maxRows={4}
                size="medium"
                id="資格"
                label="資格"
                variant="filled"
              />
              <TextField
                fullWidth
                multiline
                maxRows={4}
                size="medium"
                id="学生時代頑張ったこと"
                label="学生時代頑張ったこと"
                variant="filled"
              />
              <TextField
                fullWidth
                multiline
                maxRows={4}
                size="medium"
                id="志望理由"
                label="志望理由"
                variant="filled"
              />
            </Stack>
          </Container>
        </div>
        <hr />
      </div>
      <div>
        <h1>Stack</h1>
        <div></div>
        <hr />
      </div>

      <div>
        <h1>TextField</h1>
        <div></div>
        <hr />
      </div>
      <div>
        <h1>CheckBox</h1>
        <div></div>
        <hr />
      </div>
      <div>
        <h1>RadioGroup</h1>
        <div></div>
        <hr />
      </div>
      <div>
        <h1>Select</h1>
        <div></div>
        <hr />
      </div>
      <div>
        <h1>Button</h1>
        <div></div>
        <hr />
      </div>
      <div>
        <h1>ButtonGroup</h1>
        <div></div>
        <hr />
      </div>
      <div>
        <h1>ToggleButton</h1>
        <div></div>
        <hr />
      </div>
      <div>
        <h1>Badge</h1>
        <div></div>
        <hr />
      </div>
      <div>
        <h1>Chip</h1>
        <div></div>
        <hr />
      </div>
      <div>
        <h1>Divider</h1>
        <div></div>
        <hr />
      </div>
      <div>
        <h1>List</h1>
        <div></div>
        <hr />
      </div>
      <div>
        <h1>Table</h1>
        <div></div>
        <hr />
      </div>
      <div>
        <h1>Tooltip</h1>
        <div></div>
        <hr />
      </div>
      <div>
        <h1>Alert</h1>
        <div></div>
        <hr />
      </div>
      <div>
        <h1>Dialog</h1>
        <div></div>
        <hr />
      </div>
      <div>
        <h1>Skeleton</h1>
        <div></div>
        <hr />
      </div>
      <div>
        <h1>AppBar</h1>
        <div></div>
        <hr />
      </div>
      <div>
        <h1>Link</h1>
        <div></div>
        <hr />
      </div>
      <div>
        <h1>Menu</h1>
        <div></div>
        <hr />
      </div>
      <div>
        <h1>Pagination</h1>
        <div></div>
        <hr />
      </div>
      <div>
        <h1>Tabs</h1>
        <div></div>
        <hr />
      </div>
      <div>
        <h1>Accordion</h1>
        <div></div>
        <hr />
      </div>
      <div>
        <h1>Modal</h1>
        <div></div>
        <hr />
      </div>
      <div>
        <h1>TreeView</h1>
        <div></div>
        <hr />
      </div>
    </div>
  );
}
